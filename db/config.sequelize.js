const {Sequelize} = require('sequelize')
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

// const sequelize = new Sequelize({
// 	dialect: "postgres",
// 	storage: process.env.HEROKU_POSTGRESQL_JADE_URL,
// 	dialectOptions: {
// 		ssl: {
// 			require: true,
// 			rejectUnauthorized: false,
// 		},
// 	},
// });

if (isProduction) {
	// Break apart the Heroku database url and rebuild the configs we need
	const { DATABASE_URL } = process.env;
	const dbUrl = url.parse(DATABASE_URL);
	// const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
	const username = (process.env.PGUSER = postgres);
	const password = process.env.PGPASSWORD;
	// const password = dbUrl.auth.substr(
	//   dbUrl.auth.indexOf(':') + 1,
	//   dbUrl.auth.length
	// );
	// const dbName = dbUrl.path.slice(1);
	const dbName = process.env.PGDATABASE;
	// const host = dbUrl.hostname;
	const host = process.env.PGHOST;
	const port = process.env.PGPORT;
	// const { port } = dbUrl;
	// config.host = host;
	// config.port = port;
	// sequelize = new Sequelize(dbName, username, password, config);
	sequelize = new Sequelize(dbName, username, password, host, port);
}

module.exports = {
	development: {
		username: "<YOUR_USER_NAME>",
		password: null,
		database: "<YOUR_APP_NAME>_development",
		host: "127.0.0.1",
		dialect: "postgres",
	},
	production: {
		use_env_variable: process.env.HEROKU_POSTGRESQL_JADE_URL,
		dialect: "postgres",
		protocol: "postgres",
		dialectOptions: {
			ssl: {
				// https://github.com/sequelize/sequelize/issues/12083
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
