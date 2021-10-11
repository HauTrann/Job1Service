const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid');

var UsersDB = require('../model/user');
const utils = require('../utils/utils');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  const body = req.body;
  if (!(body.email || !body.password)) {
    res.status(400).send("All input is required");
  } else {
    const hash = utils.hash(body.email, body.password);
    const user = {
      email: body.email.toLowerCase(), // sanitize: convert email to lowercase
      password: hash,
    };
    user.id = uuidv4.v4();
    UsersDB.add(user, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

module.exports = router;
