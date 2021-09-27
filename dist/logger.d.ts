import symbols from 'log-symbols';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { ConsoleColors } from './util/console-colors';
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
declare class Logger {
    private options;
    /**
     * Internal logger
     */
    private logger;
    private init;
    constructor();
    /**
     * Configure the logger
     * @param {Partial<LoggerOptions>} options The options to configure the logger
     */
    config(options: Partial<LoggerOptions>): void;
    silly: winston.LeveledLogMethod;
    debug: winston.LeveledLogMethod;
    verbose: winston.LeveledLogMethod;
    db: winston.LeveledLogMethod;
    http: winston.LeveledLogMethod;
    info: winston.LeveledLogMethod;
    warn: winston.LeveledLogMethod;
    error: winston.LeveledLogMethod;
    middleware: (fn: string, ...meta: any) => winston.Logger;
    controller: (name: string, fn: string, ...meta: any) => winston.Logger;
    profile: (id: string | number, meta?: winston.LogEntry | undefined) => winston.Logger;
    startTimer: () => winston.Profiler;
}
declare const logger: Logger;
export default logger;
export { ConsoleColors, symbols };
