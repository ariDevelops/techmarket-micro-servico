require('dotenv').config();
const connection = require('../models/connection');

(async function test() {
  console.log('Testing MySQL connection using:');
  console.log('HOST=', process.env.MYSQL_HOST);
  console.log('PORT=', process.env.MYSQL_PORT);
  try {
    const [rows] = await connection.query('SELECT 1 as ok');
    console.log('Connection successful:', rows);
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:');
    console.error(err && err.message ? err.message : err);
    // Print some error details if available
    if (err && err.code) console.error('Error code:', err.code);
    process.exit(1);
  }
})();
