const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Define a connectTimeout to fail fast on network issues (ms)
    connectTimeout: process.env.MYSQL_CONNECT_TIMEOUT ? Number(process.env.MYSQL_CONNECT_TIMEOUT) : 10000,
});



module.exports = connection;