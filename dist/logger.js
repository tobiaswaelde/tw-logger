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
            silent: false,
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
        this.silly = (props) => this.logger.silly(props);
        this.debug = (props) => this.logger.debug(props);
        this.verbose = (props) => this.logger.verbose(props);
        this.db = (props) => this.logger.db(props);
        this.http = (props) => this.logger.http(props);
        this.info = (props) => this.logger.info(props);
        this.warn = (props) => this.logger.warn(props);
        this.error = (props) => this.logger.error(props);
        this.success = (props) => this.logger.success(props);
        this.controller = (name, fn, ...meta) => this.logger.debug(`[controller] ${name}/${fn}`, ...meta);
        this.middleware = (fn, ...meta) => this.logger.debug(`[middleware] ${fn}`, ...meta);
        // profiling
        this.profile = (id) => this.logger.profile(id);
        this.startTimer = () => this.logger.startTimer;
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
    init() {
        this.logger.transports.forEach((x) => (x.silent = this.options.silent));
        if (this.options.debugLog !== false) {
            // save debug logs
            this.logger.add(new winston_1.default.transports.DailyRotateFile(Object.assign({ format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.json()) }, this.options.debugLog)));
        }
        if (this.options.errorLog !== false) {
            // save error logs only
            this.logger.add(new winston_1.default.transports.DailyRotateFile(Object.assign({ format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), winston_1.format.json()) }, this.options.errorLog)));
        }
    }
    /**
     * Configure the logger
     * @param {Partial<LoggerOptions>} options The options to configure the logger
     */
    config(options) {
        this.options = lodash_1.default.extend(this.options, options);
        this.init();
    }
}
const logger = new Logger();
exports.default = logger;
