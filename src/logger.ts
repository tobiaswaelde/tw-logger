import symbols from 'log-symbols';
import winston, { format } from 'winston';
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
	silent: boolean;
	debugLog: LogOptions | false;
	errorLog: LogOptions | false;
	customLogs?: LogOptions[];
}

class Logger {
	private options: LoggerOptions = {
		level: 'silly',
		silent: false,
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
		this.logger.transports.forEach((x) => (x.silent = this.options.silent));

		if (this.options.debugLog !== false) {
			// save debug logs
			this.logger.add(
				new winston.transports.DailyRotateFile({
					format: format.combine(format.uncolorize(), format.timestamp(), format.json()),
					...this.options.debugLog,
				})
			);
		}
		if (this.options.errorLog !== false) {
			// save error logs only
			this.logger.add(
				new winston.transports.DailyRotateFile({
					format: format.combine(format.uncolorize(), format.timestamp(), format.json()),
					...this.options.errorLog,
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

	/**
	 * Configure the logger
	 * @param {Partial<LoggerOptions>} options The options to configure the logger
	 */
	public config(options: Partial<LoggerOptions>) {
		this.options = _.extend(this.options, options);
		this.init();
	}

	// log methods
	public silly = (msg: string, ...meta: any) => this.logger.silly(msg, meta);
	public debug = (msg: string, ...meta: any) => this.logger.debug(msg, meta);
	public verbose = (msg: string, ...meta: any) => this.logger.verbose(msg, meta);
	public db = (msg: string, ...meta: any) => this.logger.db(msg, meta);
	public http = (msg: string, ...meta: any) => this.logger.http(msg, meta);
	public info = (msg: string, ...meta: any) => this.logger.info(msg, meta);
	public warn = (msg: string, ...meta: any) => this.logger.warn(msg, meta);
	public error = (msg: string, ...meta: any) => this.logger.error(msg, meta);
	public middleware = (msg: string, ...meta: any) => this.logger.middleware(msg, meta);
	public controller = (msg: string, ...meta: any) => this.logger.controller(msg, meta);

	// profiling
	public profile = (id: string | number) => this.logger.profile(id);
	public startTimer = () => this.logger.startTimer;
}

const logger = new Logger();

export default logger;
export { ConsoleColors, symbols };
