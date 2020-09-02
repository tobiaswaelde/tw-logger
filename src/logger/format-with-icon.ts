import { format } from 'winston';
import jsonStringify from 'fast-safe-stringify';
import logSymbols from 'log-symbols';

const isSupported =
	process.platform !== 'win32' || process.env.CI || process.env.TERM === 'xterm-256color';

export const formatWithIcons = format.printf((info) => {
	const level = info.level.trim().toLowerCase();
	let symbol = '';
	if (level.includes('error')) symbol = isSupported ? '✖  ' : '✗';
	if (level.includes('warn')) symbol = isSupported ? '⚠' : '⚠';
	if (level.includes('info')) symbol = isSupported ? 'ℹ' : 'ℹ';
	if (level.includes('success')) symbol = isSupported ? '✔' : '✓';

	const stringifiedRest = jsonStringify(
		Object.assign({}, info, {
			level: undefined,
			message: undefined,
			splat: undefined,
		})
	);

	let _info = '';
	const message = `${symbol}  ${info.message}`;
	const padding = (info.padding && info.padding[info.level]) || '';
	if (stringifiedRest !== '{}') {
		// _info = `${info.level}:${padding} ${symbol}  ${info.message} ${stringifiedRest}`;
		_info = `${info.level}:${padding} ${message} ${stringifiedRest}`;
	} else {
		// _info = `${info.level}:${padding} ${symbol}  ${info.message}`;
		_info = `${info.level}:${padding} ${message}`;
	}

	return _info;
});
