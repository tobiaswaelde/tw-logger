import { format } from 'winston';
import jsonStringify from 'fast-safe-stringify';
import logSymbols from 'log-symbols';
import { MESSAGE } from 'triple-beam';

export const formatWithIcons = format((info: any) => {
	const level = info.level.trim().toLowerCase();
	let symbol = '';
	// if (level.includes('error')) symbol = isSupported ? '✖  ' : '✗';
	if (level.includes('error')) symbol = logSymbols.error;
	// if (level.includes('warn')) symbol = isSupported ? '⚠' : '⚠';
	if (level.includes('warn')) symbol = logSymbols.warning;
	// if (level.includes('info')) symbol = isSupported ? 'ℹ' : 'ℹ';
	if (level.includes('info')) symbol = logSymbols.info;
	// if (level.includes('success')) symbol = isSupported ? '✔' : '✓';
	if (level.includes('success')) symbol = logSymbols.success;

	const stringifiedRest = jsonStringify(
		Object.assign({}, info, {
			level: undefined,
			message: undefined,
			splat: undefined,
		})
	);

	const message = `${symbol}${info.message}`;
	const padding = (info.padding && info.padding[info.level]) || '';
	if (stringifiedRest !== '{}') {
		// _info = `${info.level}:${padding} ${symbol}  ${info.message} ${stringifiedRest}`;
		info[MESSAGE] = `${info.level}:${padding} ${message} ${stringifiedRest}`;
	} else {
		// _info = `${info.level}:${padding} ${symbol}  ${info.message}`;
		info[MESSAGE] = `${info.level}:${padding} ${message}`;
	}

	return info;
});
