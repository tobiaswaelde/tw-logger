import { format } from 'winston';
import jsonStringify from 'fast-safe-stringify';
import logSymbols from 'log-symbols';
import { MESSAGE } from 'triple-beam';
import { logLevels } from './log-levels';

function paddingForLevel(level: string): string {
	const lvls = Object.keys(logLevels).map((level) => level.length);
	const max = Math.max(...lvls);

	const targetLen = max + 1 - level.length;
	const padding = ` ${' '.repeat(targetLen)}`;

	return padding.slice(0, targetLen);
}

export const formatWithIcons = format((info: any) => {
	const level: string = info.level.trim().toLowerCase();
	let symbol = '';
	if (level.includes('error')) 'e';
	// if (level.includes('error')) symbol = logSymbols.error;
	if (level.includes('warn')) 'w';
	// if (level.includes('warn')) symbol = logSymbols.warning;
	if (level.includes('info')) 'i';
	// if (level.includes('info')) symbol = logSymbols.info;
	if (level.includes('success')) 's';
	// if (level.includes('success')) symbol = logSymbols.success;

	const stringifiedRest = jsonStringify(
		Object.assign({}, info, {
			level: undefined,
			message: undefined,
			splat: undefined,
		})
	);

	const message = `${symbol}${info.message}`;
	// const padding = (info.padding && info.padding[info.level]) || '';
	const padding = paddingForLevel(level);
	if (stringifiedRest !== '{}') {
		// _info = `${info.level}:${padding} ${symbol}  ${info.message} ${stringifiedRest}`;
		info[MESSAGE] = `${info.level}:${padding} ${message} ${stringifiedRest}`;
	} else {
		// _info = `${info.level}:${padding} ${symbol}  ${info.message}`;
		info[MESSAGE] = `${info.level}:${padding} ${message}`;
	}

	return info;
});
