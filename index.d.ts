import winston from 'winston';
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
declare const logger: Logger;
export default logger;
export { ConsoleColors, symbols };
