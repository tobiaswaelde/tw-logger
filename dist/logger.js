"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const log_levels_1 = require("./logger/log-levels");
const format_with_timestamp_1 = require("./logger/format-with-timestamp");
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
        format: winston_1.format.combine(winston_1.format.cli({
            levels: log_levels_1.logLevels.levels,
            colors: log_levels_1.logLevels.colors,
            level: true,
            message: true,
        }), winston_1.format.simple()),
    }));
}
exports.default = logger;
