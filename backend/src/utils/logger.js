import { format as _format, transports as _transports, createLogger } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = _format;

var transport = new (_transports.DailyRotateFile)({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: "./logs/"
});

export const logger = createLogger({ 
    transports: [
        transport
    ]
});

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

logger.add(new _transports.Console({
    format: combine(
      label({ label: 'API:' }),
      timestamp(),
      myFormat
    )
}));