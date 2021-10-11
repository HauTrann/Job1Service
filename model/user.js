var db = require('../config/db_connection');
const logger = require('../logger');
var User = {
    getAllUser: function (callback) {
        return db.query("Select * from user", callback);
    },
    getUserById: function (id, callback) {
        return db.query("select * from user where Id=?", [id], callback);
    },
    getUserByEmail: function (email, callback) {
        return db.query("select * from user where email=?", [email], callback);
    },
    add: function (user, callback) {
        logger.logDb("add User");
        return db.query("INSERT INTO user(ID, NAME,PASSWORD,STATUS,USERCREATE,EMAIL,TOKEN) VALUES (?, ?, ?, ?, ?, ?, ?);", 
        [user.id, user.name, user.password, user.status, user.usercreate, user.email, user.token], callback);
    },
    delete: function (id, callback) {
        logger.logDb("DELETE User");
        return db.query("delete from user where Id=?", [id], callback);
    },
    update: function (id, user, callback) {
        logger.logDb("UPDATE User");
        return db.query("update user set name=?,class=?,dob=? where Id=?", [user.name, user.class, user.dob, id], callback);
    }
};
module.exports = User;
