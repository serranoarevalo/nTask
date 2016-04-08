import logger from "./logger.js";

module.exports =  {
	database: "nTask",
	username: "",
	password: "",
	params: {
		dialect: "sqlite",
		storage: "ntask.sqlite",
		logging: (sql) => {
			logger.info(`[${new Date()}] ${sql}`);
		},
		define: {
			underscored: true
		}
	},
	jwtSecret: "nTa$k-AP1",
	jwtSession: {session:false}
};