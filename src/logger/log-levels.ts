import winston from 'winston/lib/winston/config';

interface ILogLevels {
	levels: winston.AbstractConfigSetLevels;
	colors: Record<string, string>;
}

export const logLevels: ILogLevels = {
	levels: {
		error: 0,
		warn: 1,
		success: 2,
		info: 3,
		http: 4,
		db: 5,
		verbose: 6,
		debug: 7,
		silly: 8,
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		success: 'green',
		info: 'green',
		http: 'magenta',
		db: 'grey',
		verbose: 'blue',
		debug: 'cyan',
		silly: 'grey',
	},
};
