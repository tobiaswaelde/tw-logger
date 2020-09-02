"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWithIcons = void 0;
const winston_1 = require("winston");
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
const isSupported = process.platform !== 'win32' || process.env.CI || process.env.TERM === 'xterm-256color';
exports.formatWithIcons = winston_1.format.printf((info) => {
    const level = info.level.trim().toLowerCase();
    let symbol = '';
    if (level.includes('error'))
        symbol = isSupported ? '✖  ' : '✗';
    if (level.includes('warn'))
        symbol = isSupported ? '⚠' : '⚠';
    if (level.includes('info'))
        symbol = isSupported ? 'ℹ' : 'ℹ';
    if (level.includes('success'))
        symbol = isSupported ? '✔' : '✓';
    const stringifiedRest = fast_safe_stringify_1.default(Object.assign({}, info, {
        level: undefined,
        message: undefined,
        splat: undefined,
    }));
    let _info = '';
    const message = `${symbol}  ${info.message}`;
    const padding = (info.padding && info.padding[info.level]) || '';
    if (stringifiedRest !== '{}') {
        // _info = `${info.level}:${padding} ${symbol}  ${info.message} ${stringifiedRest}`;
        _info = `${info.level}:${padding} ${message} ${stringifiedRest}`;
    }
    else {
        // _info = `${info.level}:${padding} ${symbol}  ${info.message}`;
        _info = `${info.level}:${padding} ${message}`;
    }
    return _info;
});
