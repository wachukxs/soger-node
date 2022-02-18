// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT

});

connection.connect(function(err) {
    if (err) {
        console.error('DB CONN ERR', err.code); // 'ER_BAD_DB_ERROR'
        console.error('error connecting: ' + err.stack);
        return; // or throw err, terminate app?
    }
  
    console.log('Connection to DB with threadID %d acquired', connection.threadId);
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
// connectionPool.on('acquire', function (connection) {
//     console.log('Connection 2 to DB with threadID %d acquired', connection.threadId);
// });
// connectionPool.on('error', function(err) {
//     console.error('DB  2 CONN ERR', err.code); // 'ER_BAD_DB_ERROR'
// });

// exports.connectionPool = connectionPool;