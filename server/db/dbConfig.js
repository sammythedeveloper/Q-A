const mysql = require("mysql2");

const dbConnection = mysql
  .createPool(process.env.MYSQL_URL) // use the full URL from .env
  .promise();

module.exports = dbConnection;
