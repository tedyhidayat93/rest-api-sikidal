let mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'db_sikidal',
    debug: false
});

pool.getConnection(function(err, connection) {
    if (err) {
        return console.log('error:' + err.message);
    }
    console.log('Connected to database SIKIDAL.');
});
  
module.exports = {
    pool
}