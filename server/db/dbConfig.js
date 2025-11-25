require("dotenv").config();
const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT), // <-- important!
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: { rejectUnauthorized: false }, // <-- needed for Railway
});

