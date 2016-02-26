import fs from "fs";
import winston from "winston";

if (!if.existsSync("logs")) {
	fs.mkdirSync("logs");
}

module.exports = new winston.Logger({
	transports: [
		new winstan.transports.File({
			level: "info",
			filename: "logs/app.log",
			maxsize: 1048576,
			maxFiles: 10,
			colorize: false
		})
	]
});