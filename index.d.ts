import winston from 'winston';
import { ConsoleColors } from './util/console-colors';
import symbols from 'log-symbols';
interface Logger extends winston.Logger {
    db: winston.LeveledLogMethod;
    success: winston.LeveledLogMethod;
    [fn: string]: any;
}
declare const logger: Logger;
export default logger;
export { ConsoleColors, symbols };
