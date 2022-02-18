// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: '',

});

exports.connection = connection;


// const connectionPool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DATABASE,
//     password: '',
  
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// exports.connectionPool = connectionPool;