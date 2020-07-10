const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()

let connection = mysql.createConnection({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);
});

module.exports = connection;