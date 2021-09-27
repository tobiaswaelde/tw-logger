"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbols = exports.ConsoleColors = void 0;
const log_symbols_1 = __importDefault(require("log-symbols"));
exports.symbols = log_symbols_1.default;
const winston_1 = __importStar(require("winston"));
require("winston-daily-rotate-file");
const log_levels_1 = require("./logger/log-levels");
const console_colors_1 = require("./util/console-colors");
Object.defineProperty(exports, "ConsoleColors", { enumerable: true, get: function () { return console_colors_1.ConsoleColors; } });
const twLogger = (options) => {
    /**
     * options or default options
     */
    const config = {
        level: (options === null || options === void 0 ? void 0 : options.level) || 'silly',
        consoleOutput: (options === null || options === void 0 ? void 0 : options.consoleOutput) !== undefined ? options.consoleOutput : true,
        debugLog: (options === null || options === void 0 ? void 0 : options.debugLog) || {
            level: 'debug',
            filename: 'logs/debug-log-%DATE%.json',
            datePattern: 'YYYY-MM-DD',
            maxSize: '1g',
        },
        errorLog: (options === null || options === void 0 ? void 0 : options.errorLog) || {
            level: 'error',
            filename: 'logs/error-log-%DATE%.json',
            datePattern: 'YYYY-MM-DD',
            maxSize: '1g',
        },
    };
    /**
     * Internal logger
     */
    const logger = winston_1.default.createLogger({
        level: config.level,
        levels: log_levels_1.logLevels.levels,
        transports: [],
    });
    //#region custom log methods
    logger.controller = (name, fn, ...meta) => {
        return logger.debug(`[controller] ${name}/${fn}`, ...meta);
    };
    logger.middleware = (fn, ...meta) => {
        return logger.debug(`[middleware] ${fn}`, ...meta);
    };
    //#endregion
    if (config.debugLog !== undefined) {
        // save debug logs
        logger.add(new winston_1.default.transports.DailyRotateFile(Object.assign({ format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.json()) }, config.debugLog)));
    }
    if (config.errorLog !== undefined) {
        // save error logs only
        logger.add(new winston_1.default.transports.DailyRotateFile(Object.assign({ format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.json()) }, config.errorLog)));
    }
    if (config.consoleOutput === true) {
        // log to console
        logger.add(new winston_1.default.transports.Console({
            format: winston_1.format.combine(winston_1.format.cli({
                levels: log_levels_1.logLevels.levels,
                colors: log_levels_1.logLevels.colors,
                level: true,
                message: true,
            }), winston_1.format.simple()),
        }));
    }
    return logger;
};
exports.default = twLogger;
