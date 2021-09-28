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
    silent: boolean;
    debugLog: LogOptions | false;
    errorLog: LogOptions | false;
    customLogs?: LogOptions[];
}
interface LeveledLogMethod {
    (message: string): winston.Logger;
    (message: string, meta: any): winston.Logger;
    (message: string, ...meta: any[]): winston.Logger;
    (infoObject: object): winston.Logger;
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
    silly: LeveledLogMethod;
    debug: LeveledLogMethod;
    verbose: LeveledLogMethod;
    db: LeveledLogMethod;
    http: LeveledLogMethod;
    info: LeveledLogMethod;
    warn: LeveledLogMethod;
    error: LeveledLogMethod;
    success: LeveledLogMethod;
    controller: (name: string, fn: string, ...meta: any) => winston.Logger;
    middleware: (fn: string, ...meta: any) => winston.Logger;
    profile: (id: string | number) => winston.Logger;
    startTimer: () => () => winston.Profiler;
}
declare const logger: Logger;
export default logger;
export { ConsoleColors, symbols };
