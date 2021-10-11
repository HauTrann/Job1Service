var db = require('../config/db_connection');
const logger = require('../logger');
var Home = {
    getContractPage: function (offset, pageSize, searchText, callback) {
        if (!searchText || searchText.trim() === '') {
            return db.query("SELECT ID,FULLNAME,EMAIL,PHONE,MESSAGE,STATUS, DATE_FORMAT(DATECREATE, '%Y-%m-%d %H:%i:%s') DATECREATE FROM contractme order by DATECREATE DESC LIMIT ? OFFSET ?",
             [Number(pageSize), Number(offset)], callback);
        } else {
            return db.query("SELECT ID,FULLNAME,EMAIL,PHONE,MESSAGE,STATUS, DATE_FORMAT(DATECREATE, '%Y-%m-%d %H:%i:%s') DATECREATE FROM contractme  WHERE UPPER(FULLNAME) LIKE UPPER(?) OR UPPER(EMAIL) LIKE UPPER(?) OR UPPER(PHONE) LIKE UPPER(?)  OR UPPER(MESSAGE) LIKE UPPER(?) order by DATECREATE DESC LIMIT ? OFFSET ?", 
            ['%' + searchText.trim() + '%', '%' + searchText.trim() + '%', '%' + searchText.trim() + '%', '%' + searchText.trim() + '%', Number(pageSize), Number(offset)], callback);
        }
        
    },
    countRow: function (searchText, callback) {
        if (!searchText || searchText.trim() === '') {
            return db.query("Select COUNT(*) Count from contractme", callback);
        } else {
            return db.query("Select COUNT(*) Count from contractme WHERE UPPER(FULLNAME) LIKE UPPER(?) OR UPPER(EMAIL) LIKE UPPER(?) OR UPPER(PHONE) LIKE UPPER(?)  OR UPPER(MESSAGE) LIKE UPPER(?)",
            ['%' + searchText.trim() + '%', '%' + searchText.trim() + '%', '%' + searchText.trim() + '%', '%' + searchText.trim() + '%'], callback);
        }
    },
    addContractMe: function (contract, callback) {
        return db.query("INSERT INTO contractme (ID, FULLNAME, EMAIL, PHONE, MESSAGE, STATUS) VALUES (?, ?, ?, ?, ?, ?)",
            [contract.ID, contract.FULLNAME, contract.EMAIL, contract.PHONE, contract.MESSAGE, contract.STATUS], callback);
    }
};
module.exports = Home;
