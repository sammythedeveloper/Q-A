require("dotenv").config();
const fs = require("fs");
const mysql = require("mysql2/promise");

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      multipleStatements: true, // allows multiple queries in the SQL file
    });

    const sql = fs.readFileSync("./anotherone.sql", "utf8"); // path to your SQL file
    await connection.query(sql);

    console.log("Database imported successfully!");
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("Error importing database:", err);
    process.exit(1);
  }
})();
