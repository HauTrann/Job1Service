const winston = require("winston");
require("winston-daily-rotate-file");

const logger = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            filename: "%DATE%.txt",
            level: "error",
            dirname: __dirname + "/log",
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                winston.format.printf(i => `${i.timestamp} --- ${i.message}`)
            )
        })
    ]
});

const dbLogger = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            filename: "%DATE%_db.txt",
            level: "error",
            dirname: __dirname + "/log",
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                winston.format.printf(i => `${i.timestamp} --- ${i.message}`)
            )
        })
    ]
});

module.exports = {
    log: (message) => logger.error(message),
    logDb: (message) => dbLogger.error(message)
};