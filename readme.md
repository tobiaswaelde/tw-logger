# Logger

## Basic Usage

##### logger.ts
```ts
import twLogger, { LoggerOptions } from 'tw-logger';

const options: LoggerOptions = {
  level: 'silly',
  consoleOutput: process.env.NODE_ENV === 'development',
  debugLog: {
    level: 'debug',
    filename: 'logs/debug-log-%DATE%.json',
    datePattern: 'YYYY-MM-DD',
    maxSize: '1g',
  },
  errorLog: {
    level: 'error',
    filename: 'logs/error-log-%DATE%.json',
    datePattern: 'YYYY-MM-DD',
    maxSize: '1g',
  },
};

const logger = twLogger(options);

export default logger;
```

##### index.ts
```ts
import logger from './logger';

logger.error('Error message');
logger.warn('Warn message');
logger.info('Info message');
logger.http('HTTP message');
logger.db('DB message');
logger.verbose('Verbose message');
logger.debug('Debug message');
logger.silly('Silly message');
```

### Output

![output image](./docs/output.png)