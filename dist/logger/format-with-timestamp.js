"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWithTimestamp = void 0;
const winston_1 = require("winston");
/**
 * Cutom formatter
 *
 * Displays a log message in the following format:
 * `[${timestamp}] ${level} ${message}`
 *
 * @returns {String} Log message with timestamp
 */
exports.formatWithTimestamp = winston_1.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level} ${message}`;
});
