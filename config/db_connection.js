'use strict';
var mysql = require('mysql');
const logger = require('../logger');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234Abcd@@",
    database: "AZCLUB"
    // host: "remotemysql.com",
    // user: "rmB2NLg5Mh",
    // password: "J86hhJpJDN",
    // database: "rmB2NLg5Mh"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
    logger.logDb("Database Connected");
});

module.exports = con;
