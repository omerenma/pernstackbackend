const { Pool, Client } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGUSER} : ${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const client = new Client({
	// connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});
client.connect();

module.exports = {
	query: (text, params) => client.query(text, params),
	client: client,
};
