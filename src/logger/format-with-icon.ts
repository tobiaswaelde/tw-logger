import { format } from 'winston';
import jsonStringify from 'fast-safe-stringify';
import logSymbols from 'log-symbols';

export const formatWithIcons = format.printf((info) => {
	const level = info.level.trim().toLowerCase();
	let symbol = logSymbols.info;
	// if (info.level == 'error') symbol = logSymbols.error;
	if (level.includes('error')) symbol = '✗';
	if (level == 'warn') symbol = logSymbols.warning;
	if (level == 'info') symbol = logSymbols.info;
	if (level == 'success') symbol = '✓';

	const stringifiedRest = jsonStringify(
		Object.assign({}, info, {
			level: undefined,
			message: undefined,
			splat: undefined,
		})
	);

	let _info = '';
	const padding = (info.padding && info.padding[info.level]) || '';
	if (stringifiedRest !== '{}') {
		_info = `${info.level}:${symbol}${padding} ${info.message} ${stringifiedRest}`;
	} else {
		_info = `${info.level}:${symbol}${padding} ${info.message}`;
	}

	return _info;
});
