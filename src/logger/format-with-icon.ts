import { format } from 'winston';
import jsonStringify from 'fast-safe-stringify';
import logSymbols from 'log-symbols';

export const formatWithIcons = format.printf((info) => {
	let symbol = '';
	if (info.level == 'error') symbol = logSymbols.error;
	if (info.level == 'warn') symbol = logSymbols.warning;
	if (info.level == 'info') symbol = logSymbols.info;
	if (info.level == 'success') symbol = logSymbols.success;

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
		_info = `${info.level}:${padding} ${symbol}  ${info.message} ${stringifiedRest}`;
	} else {
		_info = `${info.level}:${padding} ${symbol}  ${info.message}`;
	}

	return _info;
});
