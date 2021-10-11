const salt = '053d5ebd-e23c-411c-b670-09b582c67569';
const tokenKey = '053d5ebd-e23c-411c-b670-09b582c67569';
const tokenExpiration = {
    expiresIn: "2h",
};
const uuidv4 = require('uuid');
const crypto = require('crypto');


const hash = (email, password) => {
    return crypto.createHash('sha256').update(email + salt + password).digest('base64');
};

const payload = (token) => {
    const pay = jwt.verify(token, tokenKey, tokenExpiration);
    return pay;
}

module.exports = {
    hash,
    payload,
    salt,
    tokenKey,
    tokenExpiration
};