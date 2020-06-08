import winston from 'winston';
interface Logger extends winston.Logger {
    db: winston.LeveledLogMethod;
}
declare const logger: Logger;
export default logger;
