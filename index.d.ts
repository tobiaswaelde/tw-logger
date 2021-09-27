import symbols from 'log-symbols';
import winston from 'winston';
import 'winston-daily-rotate-file';
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
declare const twLogger: (options?: Partial<LoggerOptions> | undefined) => Logger;
export default twLogger;
export { ConsoleColors, symbols };
