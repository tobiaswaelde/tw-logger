import { format } from 'winston';
import jsonStringify from 'fast-safe-stringify';
import logSymbols from 'log-symbols';

export const formatWithIcons = format.printf((info) => {
	const level = info.level.trim().toLowerCase();
	let symbol = '';
	if (level.includes('error')) symbol = logSymbols.error;
	if (level.includes('warn')) symbol = logSymbols.warning;
	if (level.includes('info')) symbol = logSymbols.info;
	if (level.includes('success')) symbol = logSymbols.success;

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
		_info = `${info.level}:${padding}  ${symbol} ${info.message} ${stringifiedRest}`;
	} else {
		_info = `${info.level}:${padding}  ${symbol} ${info.message}`;
	}

	return _info;
});
