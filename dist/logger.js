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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleColors = void 0;
const winston_1 = __importStar(require("winston"));
const log_levels_1 = require("./logger/log-levels");
const format_with_timestamp_1 = require("./logger/format-with-timestamp");
const console_colors_1 = require("./util/console-colors");
Object.defineProperty(exports, "ConsoleColors", { enumerable: true, get: function () { return console_colors_1.ConsoleColors; } });
const format_with_icon_1 = require("./logger/format-with-icon");
const logger = winston_1.default.createLogger({
    level: 'silly',
    levels: log_levels_1.logLevels.levels,
    transports: [],
});
const NODE_ENV = String(process.env.NODE_ENV).trim() || 'dev';
// save error logs only
logger.add(new winston_1.default.transports.File({
    format: winston_1.format.combine(winston_1.format.timestamp(), format_with_timestamp_1.formatWithTimestamp),
    level: 'error',
    filename: 'logs/error.log',
}));
// save all logs
logger.add(new winston_1.default.transports.File({
    format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.timestamp(), format_with_timestamp_1.formatWithTimestamp),
    level: 'debug',
    filename: 'logs/debug.log',
}));
// log to console if not in production
if (NODE_ENV !== 'production') {
    // log to console
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.format.combine(format_with_icon_1.formatWithIcons, winston_1.format.cli({
            levels: log_levels_1.logLevels.levels,
            colors: log_levels_1.logLevels.colors,
            level: true,
            message: true,
        }), 
        // format.simple()
        format_with_icon_1.formatWithIcons),
    }));
}
exports.default = logger;
