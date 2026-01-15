// const mysql = require("mysql2");

// const dbConnection = mysql
//   .createPool({
//     host: process.env.MYSQL_HOST,
//     port: Number(process.env.MYSQL_PORT),
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//   })
//   .promise();

// module.exports = dbConnection;

const mysql = require("mysql2");

const dbConnection = mysql.createPool({
  uri: process.env.MYSQL_URL,      // Use the variable you set in Railway
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false },  // Required for Private Network
}).promise();

module.exports = dbConnection;

