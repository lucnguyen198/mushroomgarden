require("dotenv").config();
const mysql = require("mysql");

const dbConn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// dbConn.connect(function(error) {
//   if (error) throw error;
//   console.log("Database connect successfully!");
// });

module.exports = dbConn;
