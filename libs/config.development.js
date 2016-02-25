module.exports =  {
	database: "nTask",
	username: "",
	password: "",
	params: {
		dialect: "sqlite",
		storage: "ntask.sqlite",
		define: {
			underscored: true
		}
	},
	jwtSecret: "nTa$k-AP1",
	jwtSession: {session:false}
};