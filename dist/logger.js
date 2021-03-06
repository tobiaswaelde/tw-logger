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
const winston_1 = __importStar(require("winston"));
const log_levels_1 = require("./logger/log-levels");
const console_colors_1 = require("./util/console-colors");
Object.defineProperty(exports, "ConsoleColors", { enumerable: true, get: function () { return console_colors_1.ConsoleColors; } });
const log_symbols_1 = __importDefault(require("log-symbols"));
exports.symbols = log_symbols_1.default;
require("winston-daily-rotate-file");
const logger = winston_1.default.createLogger({
    level: 'silly',
    levels: log_levels_1.logLevels.levels,
    transports: [],
});
logger.controller = (name, fn, ...meta) => logger.debug(`[controller] ${name}/${fn}`, ...meta);
logger.middleware = (fn, ...meta) => logger.debug(`[middleware] ${fn}`, ...meta);
const NODE_ENV = String(process.env.NODE_ENV).trim() || 'dev';
// save error logs only
logger.add(new winston_1.default.transports.DailyRotateFile({
    format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.json()),
    level: 'error',
    filename: 'logs/error-log-%DATE%.json',
    datePattern: 'YYYY-MM-DD',
    maxSize: '1g',
}));
// save debug logs
logger.add(new winston_1.default.transports.DailyRotateFile({
    format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.json()),
    level: 'debug',
    filename: 'logs/debug-log-%DATE%.json',
    datePattern: 'YYYY-MM-DD',
    maxSize: '1g',
}));
// log to console if not in production
if (NODE_ENV !== 'production') {
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
exports.default = logger;
