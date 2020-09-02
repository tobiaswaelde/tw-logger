"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWithIcons = void 0;
const winston_1 = require("winston");
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
const triple_beam_1 = require("triple-beam");
function paddingForLevel(levels, level) {
    const lvls = Object.keys(levels).map((level) => level.length);
    const max = Math.max(...lvls);
    const targetLen = max + 1 - level.length;
    const padding = ` ${' '.repeat(targetLen)}`;
    return padding.slice(0, targetLen);
}
exports.formatWithIcons = winston_1.format((info, opts) => {
    const level = info.level.trim().toLowerCase();
    let symbol = '';
    if (level.includes('error'))
        'e';
    // if (level.includes('error')) symbol = logSymbols.error;
    if (level.includes('warn'))
        'w';
    // if (level.includes('warn')) symbol = logSymbols.warning;
    if (level.includes('info'))
        'i';
    // if (level.includes('info')) symbol = logSymbols.info;
    if (level.includes('success'))
        's';
    // if (level.includes('success')) symbol = logSymbols.success;
    const stringifiedRest = fast_safe_stringify_1.default(Object.assign({}, info, {
        level: undefined,
        message: undefined,
        splat: undefined,
    }));
    const message = `${symbol}${info.message}`;
    // const padding = (info.padding && info.padding[info.level]) || '';
    const padding = paddingForLevel(opts.levels, level);
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
