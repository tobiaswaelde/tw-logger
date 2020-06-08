import winston from 'winston/lib/winston/config';
interface ILogLevels {
    levels: winston.AbstractConfigSetLevels;
    colors: Record<string, string>;
}
export declare const logLevels: ILogLevels;
export {};
