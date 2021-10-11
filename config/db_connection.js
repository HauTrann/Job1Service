'use strict';
var mysql = require('mysql');
const logger = require('../logger');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "blue-ridge"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
    logger.logDb("Database Connected");
});

module.exports = con;
