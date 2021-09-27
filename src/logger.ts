import symbols from 'log-symbols';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';
import { logLevels } from './logger/log-levels';
import { ConsoleColors } from './util/console-colors';

interface Logger extends winston.Logger {
	db: winston.LeveledLogMethod;
	success: winston.LeveledLogMethod;

	/** Log controller
	//  *
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

export interface LogOptions {
	level?: string;
	filename?: string;
	datePattern?: string;
	maxSize?: string;
}
export interface LoggerOptions {
	level: string;
	consoleOutput: boolean;
	debugLog: LogOptions;
	errorLog: LogOptions;
	customLogs?: LogOptions[];
}
const twLogger = (options?: Partial<LoggerOptions>) => {
	/**
	 * options or default options
	 */
	const config: LoggerOptions = {
		level: options?.level || 'silly',
		consoleOutput: options?.consoleOutput !== undefined ? options.consoleOutput : true,
		debugLog: options?.debugLog || {
			level: 'debug',
			filename: 'logs/debug-log-%DATE%.json',
			datePattern: 'YYYY-MM-DD',
			maxSize: '1g',
		},
		errorLog: options?.errorLog || {
			level: 'error',
			filename: 'logs/error-log-%DATE%.json',
			datePattern: 'YYYY-MM-DD',
			maxSize: '1g',
		},
	};

	/**
	 * Internal logger
	 */
	const logger = winston.createLogger({
		level: config.level,
		levels: logLevels.levels,
		transports: [],
	}) as Logger;

	//#region custom log methods
	logger.controller = (name: string, fn: string, ...meta: any) => {
		return logger.debug(`[controller] ${name}/${fn}`, ...meta);
	};

	logger.middleware = (fn: string, ...meta: any) => {
		return logger.debug(`[middleware] ${fn}`, ...meta);
	};
	//#endregion

	if (config.debugLog !== undefined) {
		// save debug logs
		logger.add(
			new winston.transports.DailyRotateFile({
				format: format.combine(format.uncolorize(), format.timestamp(), format.json()),
				...config.debugLog,
			})
		);
	}

	if (config.errorLog !== undefined) {
		// save error logs only
		logger.add(
			new winston.transports.DailyRotateFile({
				format: format.combine(format.uncolorize(), format.timestamp(), format.json()),
				...config.errorLog,
			})
		);
	}

	if (config.consoleOutput === true) {
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

	return logger;
};

export default twLogger;
export { ConsoleColors, symbols };
