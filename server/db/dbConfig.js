const mysql = require("mysql2");
const { URL } = require("url");

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL is not defined");
}

const dbUrl = new URL(process.env.MYSQL_URL);

const dbConnection = mysql
  .createPool({
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1), // remove leading slash
    port: dbUrl.port,
    waitForConnections: true,
    connectionLimit: 10,
    ssl: { rejectUnauthorized: false }, // Required for Railway Private Network
  })
  .promise();

module.exports = dbConnection;
