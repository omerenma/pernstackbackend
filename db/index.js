const { Pool, Client } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const client = new Client({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
});
client.connect();

module.exports = {
	query: (text, params) => client.query(text, params),
	client: client,
};
