import symbols from 'log-symbols';
import winston, { format, loggers } from 'winston';
import 'winston-daily-rotate-file';
import { logLevels } from './logger/log-levels';
import { ConsoleColors } from './util/console-colors';
import _ from 'lodash';

interface CustomLogger extends winston.Logger {
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

class Logger {
	private options: LoggerOptions = {
		level: 'silly',
		consoleOutput: true,
		debugLog: {
			level: 'debug',
			filename: 'logs/debug-log-%DATE%.json',
			datePattern: 'YYYY-MM-DD',
			maxSize: '1g',
		},
		errorLog: {
			level: 'error',
			filename: 'logs/error-log-%DATE%.json',
			datePattern: 'YYYY-MM-DD',
			maxSize: '1g',
		},
	};

	/**
	 * Internal logger
	 */
	private logger = winston.createLogger({
		level: this.options.level,
		levels: logLevels.levels,
		transports: [],
	}) as CustomLogger;

	private init() {
		if (this.options.debugLog !== undefined) {
			// save debug logs
			this.logger.add(
				new winston.transports.DailyRotateFile({
					format: format.combine(format.uncolorize(), format.timestamp(), format.json()),
					...this.options.debugLog,
				})
			);
		}

		if (this.options.errorLog !== undefined) {
			// save error logs only
			this.logger.add(
				new winston.transports.DailyRotateFile({
					format: format.combine(format.uncolorize(), format.timestamp(), format.json()),
					...this.options.errorLog,
				})
			);
		}

		if (this.options.consoleOutput === true) {
			// log to console
			this.logger.add(
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
	}

	constructor() {
		//#region custom log methods
		this.logger.controller = (name: string, fn: string, ...meta: any) => {
			return this.logger.debug(`[controller] ${name}/${fn}`, ...meta);
		};

		this.logger.middleware = (fn: string, ...meta: any) => {
			return this.logger.debug(`[middleware] ${fn}`, ...meta);
		};
		//#endregion

		this.init();
	}

	/**
	 * Configure the logger
	 * @param {Partial<LoggerOptions>} options The options to configure the logger
	 */
	public config(options: Partial<LoggerOptions>) {
		this.options = _.extend(options, this.options);
		this.init();
	}

	// log methods
	public silly = this.logger.silly;
	public debug = this.logger.debug;
	public verbose = this.logger.verbose;
	public db = this.logger.db;
	public http = this.logger.http;
	public info = this.logger.info;
	public warn = this.logger.warn;
	public error = this.logger.error;
	public middleware = this.logger.middleware;
	public controller = this.logger.controller;

	// profiling
	public profile = this.logger.profile;
	public startTimer = this.logger.startTimer;
}

const logger = new Logger();

export default logger;
export { ConsoleColors, symbols };
