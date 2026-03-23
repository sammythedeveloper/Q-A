const mysql = require("mysql2");
require('dotenv').config();

let poolConfig;

// 1. If MYSQL_URL exists (Railway/Production), parse it
if (process.env.MYSQL_URL) {
  const { URL } = require("url");
  const dbUrl = new URL(process.env.MYSQL_URL);
  
  poolConfig = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    port: dbUrl.port,
    ssl: { rejectUnauthorized: false } 
  };
} else {
  // 2. Fallback to your Local MAMP settings from .env
  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 8889,
  };
}

// Create the connection pool
const dbConnection = mysql.createPool({
  ...poolConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

module.exports = dbConnection;