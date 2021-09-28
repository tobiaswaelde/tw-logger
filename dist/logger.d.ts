import symbols from 'log-symbols';
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
    debugLog: LogOptions | false;
    errorLog: LogOptions | false;
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
    silly: (msg: string, ...meta: any) => void;
    debug: (msg: string, ...meta: any) => void;
}
declare const logger: Logger;
export default logger;
export { ConsoleColors, symbols };
