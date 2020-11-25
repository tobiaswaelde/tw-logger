"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logLevels = void 0;
exports.logLevels = {
    levels: {
        error: 0,
        warn: 1,
        success: 2,
        info: 3,
        http: 4,
        debug: 5,
        db: 6,
        verbose: 6,
        silly: 8,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        success: 'green',
        info: 'blue',
        http: 'magenta',
        debug: 'cyan',
        db: 'grey',
        verbose: 'blue',
        silly: 'grey',
    },
};
