import winston, { format } from 'winston';
import { logLevels } from './logger/log-levels';
import { formatWithTimestamp } from './logger/format-with-timestamp';
import { ConsoleColors } from './util/console-colors';

interface Logger extends winston.Logger {
	db: winston.LeveledLogMethod;
}

const logger = winston.createLogger({
	level: 'silly',
	levels: logLevels.levels,
	transports: [],
}) as Logger;

const NODE_ENV = String(process.env.NODE_ENV).trim() || 'dev';

// save error logs only
logger.add(
	new winston.transports.File({
		format: format.combine(format.timestamp(), formatWithTimestamp),
		level: 'error',
		filename: 'logs/error.log',
	})
);

// save all logs
logger.add(
	new winston.transports.File({
		format: format.combine(format.uncolorize(), format.timestamp(), formatWithTimestamp),
		level: 'debug',
		filename: 'logs/debug.log',
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
export { ConsoleColors };
