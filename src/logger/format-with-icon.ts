import { format } from 'winston';
import jsonStringify from 'fast-safe-stringify';
import logSymbols from 'log-symbols';
import { MESSAGE } from 'triple-beam';
import { logLevels } from './log-levels';

function getLongestLevel(): number {
	const lvls = Object.keys(logLevels).map((level) => level.length);
	return Math.max(...lvls);
}
const maxLength = getLongestLevel();

function paddingForLevel(level: string, filler: string, maxLength: number): string {
	const targetLen = maxLength + 1 - level.length;
	const rep = Math.floor(targetLen / filler.length);
	const padding = `${filler}${filler.repeat(rep)}`;
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
	const padding = paddingForLevel(level.toString(), ' ', maxLength);
	if (stringifiedRest !== '{}') {
		// _info = `${info.level}:${padding} ${symbol}  ${info.message} ${stringifiedRest}`;
		info[MESSAGE] = `${info.level}:${padding} ${message} ${stringifiedRest}`;
	} else {
		// _info = `${info.level}:${padding} ${symbol}  ${info.message}`;
		info[MESSAGE] = `${info.level}:${padding} ${message}`;
	}

	return info;
});
