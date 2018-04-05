var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: 'root',
    database: 'competencias'
});

module.exports = connection;