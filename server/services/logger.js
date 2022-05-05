const { createLogger, format, transports, addColors } = require("winston");
const { combine, timestamp, label, printf, prettyPrint, colorize } = format;
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
addColors({
  info: "bold blue", // fontStyle color
  warn: "italic yellow",
  error: "bold red",
  debug: "green",
});
const timezoned = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset).toISOString();
  return localISOTime;
};
const logger = (folder, filename) => {
  return createLogger({
    format: combine(
      label({ label: "IFC log" }),
      timestamp({ format: timezoned }),
      prettyPrint()
    ),
    transports: [
      new transports.Console({}),
      new DailyRotateFile({
        colorize: true,
        filename: path.join(
          __dirname + "/../../logs/",
          folder,
          filename + "_%DATE%.log"
        ),
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "100m",
        maxFiles: "31d",
      }),
    ],
  });
};

module.exports = logger;
