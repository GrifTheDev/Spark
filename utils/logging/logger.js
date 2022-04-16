const { createLogger, format, transports } = require("winston");

const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/errors.log", level: "error" }),
    new transports.File({ filename: "logs/mixed.log", level: "debug" }),
    new transports.File({ filename: "logs/warns.log", level: "warn" }),
  ],
  exitOnError: true
});

module.exports = logger;
