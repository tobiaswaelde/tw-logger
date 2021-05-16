import winston, { format } from 'winston';
import { logLevels } from './logger/log-levels';
import { formatWithTimestamp } from './logger/format-with-timestamp';
import { ConsoleColors } from './util/console-colors';
import symbols from 'log-symbols';
import 'winston-daily-rotate-file';

interface Logger extends winston.Logger {
	db: winston.LeveledLogMethod;
	success: winston.LeveledLogMethod;

	/** Log controller
	 *
	 * @description
	 * Logs a debug message in the format of the example
	 *
	 * @example
	 * '[controller] NAME/FN ...meta'
	 *
	 * @param {string} name Controller name
	 * @param {string} fn Controller function name
	 * @param {any} meta Additional meta data
	 */
	controller: (name: string, fn: string, ...meta: any) => winston.Logger;

	/** Log middleware
	 *
	 * @description
	 * Logs a debug message in the format of the example
	 *
	 * @example
	 * '[middleware] FN ...meta'
	 *
	 * @param {string} fn Middleware function name
	 * @param {any} meta Additional meta data
	 */
	middleware: (fn: string, ...meta: any) => winston.Logger;

	[fn: string]: any;
}

const logger = winston.createLogger({
	level: 'silly',
	levels: logLevels.levels,
	transports: [],
}) as Logger;

logger.controller = (name: string, fn: string, ...meta: any) =>
	logger.debug(`[controller] ${name}/${fn}`, ...meta);

logger.middleware = (fn: string, ...meta: any) => logger.debug(`[middleware] ${fn}`, ...meta);

const NODE_ENV = String(process.env.NODE_ENV).trim() || 'dev';

// save error logs only
logger.add(
	new winston.transports.DailyRotateFile({
		format: format.combine(format.uncolorize(), format.timestamp(), format.json()),
		level: 'error',
		filename: 'logs/error-log-%DATE%.json',
		datePattern: 'YYYY-MM-DD',
		maxSize: '1g',
	})
);

// save debug logs
logger.add(
	new winston.transports.DailyRotateFile({
		format: format.combine(format.uncolorize(), format.timestamp(), format.json()),
		level: 'debug',
		filename: 'logs/debug-log-%DATE%.json',
		datePattern: 'YYYY-MM-DD',
		maxSize: '1g',
	})
);

// log to console if not in production
if (NODE_ENV !== 'production') {
	// log to console
	logger.add(
		new winston.transports.Console({
			format: format.combine(
				format.cli({
					levels: logLevels.levels,
					colors: logLevels.colors,
					level: true,
					message: true,
				}),
				format.simple()
			),
		})
	);
}

export default logger;
export { ConsoleColors, symbols };
