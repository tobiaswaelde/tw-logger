"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWithIcons = void 0;
const winston_1 = require("winston");
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
const log_symbols_1 = __importDefault(require("log-symbols"));
const triple_beam_1 = require("triple-beam");
exports.formatWithIcons = winston_1.format((info) => {
    const level = info.level.trim().toLowerCase();
    let symbol = '';
    // if (level.includes('error')) symbol = isSupported ? '✖  ' : '✗';
    if (level.includes('error'))
        symbol = log_symbols_1.default.error;
    // if (level.includes('warn')) symbol = isSupported ? '⚠' : '⚠';
    if (level.includes('warn'))
        symbol = log_symbols_1.default.warning;
    // if (level.includes('info')) symbol = isSupported ? 'ℹ' : 'ℹ';
    if (level.includes('info'))
        symbol = log_symbols_1.default.info;
    // if (level.includes('success')) symbol = isSupported ? '✔' : '✓';
    if (level.includes('success'))
        symbol = log_symbols_1.default.success;
    const stringifiedRest = fast_safe_stringify_1.default(Object.assign({}, info, {
        level: undefined,
        message: undefined,
        splat: undefined,
    }));
    const message = `${symbol}${info.message}`;
    const padding = (info.padding && info.padding[info.level]) || '';
    if (stringifiedRest !== '{}') {
        // _info = `${info.level}:${padding} ${symbol}  ${info.message} ${stringifiedRest}`;
        info[triple_beam_1.MESSAGE] = `${info.level}:${padding} ${message} ${stringifiedRest}`;
    }
    else {
        // _info = `${info.level}:${padding} ${symbol}  ${info.message}`;
        info[triple_beam_1.MESSAGE] = `${info.level}:${padding} ${message}`;
    }
    return info;
});
