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
const lodash_1 = __importDefault(require("lodash"));
class Logger {
    constructor() {
        this.options = {
            level: 'silly',
            consoleOutput: true,
            debugLog: {
                level: 'debug',
                filename: 'logs/debug-log-%DATE%.json',
                datePattern: 'YYYY-MM-DD',
                maxSize: '1g',
            },
            errorLog: {
                level: 'error',
                filename: 'logs/error-log-%DATE%.json',
                datePattern: 'YYYY-MM-DD',
                maxSize: '1g',
            },
        };
        /**
         * Internal logger
         */
        this.logger = winston_1.default.createLogger({
            level: this.options.level,
            levels: log_levels_1.logLevels.levels,
            transports: [],
        });
        // log methods
        this.silly = this.logger.silly;
        this.debug = this.logger.debug;
        this.verbose = this.logger.verbose;
        this.db = this.logger.db;
        this.http = this.logger.http;
        this.info = this.logger.info;
        this.warn = this.logger.warn;
        this.error = this.logger.error;
        this.middleware = this.logger.middleware;
        this.controller = this.logger.controller;
        // profiling
        this.profile = this.logger.profile;
        this.startTimer = this.logger.startTimer;
        //#region custom log methods
        this.logger.controller = (name, fn, ...meta) => {
            return this.logger.debug(`[controller] ${name}/${fn}`, ...meta);
        };
        this.logger.middleware = (fn, ...meta) => {
            return this.logger.debug(`[middleware] ${fn}`, ...meta);
        };
        //#endregion
        this.init();
    }
    init() {
        if (this.options.debugLog !== undefined) {
            // save debug logs
            this.logger.add(new winston_1.default.transports.DailyRotateFile(Object.assign({ format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.json()) }, this.options.debugLog)));
        }
        if (this.options.errorLog !== undefined) {
            // save error logs only
            this.logger.add(new winston_1.default.transports.DailyRotateFile(Object.assign({ format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.json()) }, this.options.errorLog)));
        }
        if (this.options.consoleOutput === true) {
            // log to console
            this.logger.add(new winston_1.default.transports.Console({
                format: winston_1.format.combine(winston_1.format.cli({
                    levels: log_levels_1.logLevels.levels,
                    colors: log_levels_1.logLevels.colors,
                    level: true,
                    message: true,
                }), winston_1.format.simple()),
            }));
        }
    }
    /**
     * Configure the logger
     * @param {Partial<LoggerOptions>} options The options to configure the logger
     */
    config(options) {
        this.options = lodash_1.default.extend(options, this.options);
        this.init();
    }
}
const logger = new Logger();
exports.default = logger;
