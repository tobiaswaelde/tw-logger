"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWithIcons = void 0;
const winston_1 = require("winston");
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
const log_symbols_1 = __importDefault(require("log-symbols"));
exports.formatWithIcons = winston_1.format.printf((info) => {
    const level = info.level.trim().toLowerCase();
    let symbol = log_symbols_1.default.info;
    // if (info.level == 'error') symbol = logSymbols.error;
    if (level.includes('error'))
        symbol = '✗';
    if (level == 'warn')
        symbol = log_symbols_1.default.warning;
    if (level == 'info')
        symbol = log_symbols_1.default.info;
    if (level == 'success')
        symbol = '✓';
    const stringifiedRest = fast_safe_stringify_1.default(Object.assign({}, info, {
        level: undefined,
        message: undefined,
        splat: undefined,
    }));
    let _info = '';
    const padding = (info.padding && info.padding[info.level]) || '';
    if (stringifiedRest !== '{}') {
        _info = `${info.level}:${symbol}${padding} ${info.message} ${stringifiedRest}`;
    }
    else {
        _info = `${info.level}:${symbol}${padding} ${info.message}`;
    }
    return _info;
});
