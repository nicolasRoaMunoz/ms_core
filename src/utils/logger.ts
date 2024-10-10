const winston = require('winston');
require('winston-daily-rotate-file');

const { createLogger, format, transports } = winston;

const transportFile = new winston.transports.DailyRotateFile({
    filename: './log/core-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '90d',
    colorize: true,
    level: 'debug',
    format: format.combine(
        format.simple(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf((info: any) => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`),
    ),
});

const logger = createLogger({
    transports: [

        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.colorize(),
                format.simple(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf((info: any) => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`),
            ),
        }),
        transportFile,

    ],
});

export default logger;
