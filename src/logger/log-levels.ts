import winston from 'winston/lib/winston/config';

interface ILogLevels {
	levels: winston.AbstractConfigSetLevels;
	colors: Record<string, string>;
}

export const logLevels: ILogLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		db: 4,
		verbose: 5,
		debug: 6,
		silly: 7,
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		http: 'magenta',
		db: 'grey',
		verbose: 'blue',
		debug: 'cyan',
		silly: 'grey',
	},
};
