import { format } from 'winston';

/**
 * Cutom formatter
 *
 * Displays a log message in the following format:
 * `[${timestamp}] ${level} ${message}`
 *
 * @returns {String} Log message with timestamp
 */
export const formatWithTimestamp = format.printf(({ level, message, timestamp }) => {
	return `[${timestamp}] ${level} ${message}`;
});
