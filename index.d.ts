import winston from 'winston';
import { ConsoleColors } from './util/console-colors';
interface Logger extends winston.Logger {
    db: winston.LeveledLogMethod;
    success: winston.LeveledLogMethod;
}
declare const logger: Logger;
export default logger;
export { ConsoleColors };
