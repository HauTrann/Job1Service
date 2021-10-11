var db = require('../config/db_connection');
const logger = require('../logger');
const uuidv4 = require('uuid');

var NetWork = {
    getAllNetWork: function (callback) {
        return db.query("Select * from network ORDER BY `ORDER`", callback);
    },
    getMembers: function (NetworkID, callback) {
        return db.query("Select * from networkmember WHERE NETWORKID =? ", [NetworkID], callback);
    },
    countRow: function (searchText, callback) {
        if (!searchText || searchText.trim() === '') {
            return db.query("Select COUNT(*) as Count from network", callback);
        } else {
            return db.query("Select COUNT(*) as Count from network WHERE UPPER(NAME) LIKE UPPER(?) OR UPPER(CODE) LIKE UPPER(?) ",
                ['%' + searchText.trim() + '%', '%' + searchText.trim() + '%'], callback);
        }
    },
    getAllNetWorkPage: function (offset, pageSize, searchText, callback) {
        if (!searchText || searchText.trim() === '') {
            return db.query("SELECT * FROM network order by `ORDER` LIMIT ? OFFSET ?",
                [Number(pageSize), Number(offset)], callback);
        } else {
            return db.query("SELECT * FROM network WHERE UPPER(NAME) LIKE UPPER(?) OR UPPER(CODE) LIKE UPPER(?) order by `ORDER` LIMIT ? OFFSET ?",
                ['%' + searchText.trim() + '%', '%' + searchText.trim() + '%', Number(pageSize), Number(offset)], callback);
        }
    },
    getNetWorkById: function (id, callback) {
        return db.query("select * from network where Id=?", [id], callback);
    },
    add: function (network, callback) {
        logger.logDb("add NetWork");
        return db.query("INSERT INTO network (ID, NAME, CODE, ICON, NAMEICON, EXPECTEDAPY, COMMISSION, TOKENPRICE, TOTALAMOUNT, STATUS, USERCREATE, USERMODIFY, DATEMODIFY, network.ORDER, STATUSNAME, BACKGROUND) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [network.ID, network.NAME, network.CODE, network.ICON, network.NAMEICON, network.EXPECTEDAPY, network.COMMISSION, network.TOKENPRICE, network.TOTALAMOUNT, network.STATUS, network.USERCREATE, network.USERMODIFY, network.DATEMODIFY, network.ORDER, network.STATUSNAME, network.BACKGROUND], callback);
    },

    deleteMember: function (NetworkID, callback) {
        let sql = "DELETE FROM networkmember WHERE NETWORKID= ?";
        db.query(sql, [NetworkID], callback);
    },

    addMemember: function (networkMembers, NetworkID, callback) {
        logger.logDb("add NetWorkMember");
        let sql = "INSERT INTO networkmember (ID, NETWORKID, NAME, ADRRESS, LINK, STATUS, TYPE, `ORDER`) VALUES ?";
        let values = [networkMembers.map(item => [uuidv4.v4(), NetworkID, item.NAME, item.ADRRESS, item.LINK, item.STATUS, item.TYPE, item.ORDER])];
        db.query(sql, values, callback);
    },

    delete: function (id, callback) {
        logger.logDb("DELETE NetWork");
        return db.query("delete from network where Id=?", [id], callback);
    },
    getFileByID: function (id, callback) {
        return db.query("SELECT ICONDATA from network where Id=?", [id], callback);
    },
    update: function (network, callback) {
        logger.logDb("UPDATE NetWork");
        return db.query("UPDATE network SET NAME = ?, CODE = ?, ICON = ?, NAMEICON = ?, EXPECTEDAPY = ?, COMMISSION = ?, TOKENPRICE = ?, TOTALAMOUNT = ?, STATUS = ?, USERMODIFY = ?, DATEMODIFY = ?, network.ORDER = ?, STATUSNAME = ?, BACKGROUND=? WHERE ID = ?",
            [network.NAME, network.CODE, network.ICON, network.NAMEICON, network.EXPECTEDAPY, network.COMMISSION, network.TOKENPRICE, network.TOTALAMOUNT, network.STATUS, network.USERMODIFY, network.DATEMODIFY, Number(network.ORDER), network.STATUSNAME, network.BACKGROUND, network.ID], callback);
    },
    updateData: function (network, callback) {
        logger.logDb("UPDATE NetWork");
        return db.query("UPDATE network SET NAME = ?, CODE = ?, ICON = ?, NAMEICON = ?, EXPECTEDAPY = ?, COMMISSION = ?, TOKENPRICE = ?, TOTALAMOUNT = ?, STATUS = ?, USERMODIFY = ?, DATEMODIFY = ?, network.ORDER = ?, STATUSNAME = ? , BACKGROUND=?, ICONDATA = ? WHERE ID = ?",
            [network.NAME, network.CODE, network.ICON, network.NAMEICON, network.EXPECTEDAPY, network.COMMISSION, network.TOKENPRICE, network.TOTALAMOUNT, network.STATUS, network.USERMODIFY, network.DATEMODIFY, Number(network.ORDER), network.STATUSNAME, network.BACKGROUND, network.ICONDATA, network.ID], callback);
    }
};
module.exports = NetWork;
