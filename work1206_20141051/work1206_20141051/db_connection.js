var mysql = require('mysql');
var config = require('./db_config');

var client = mysql.createConnection({
    user: config.user,
    port: config.port,
    password: config.password,
    database: config.database
});

module.exports = client;