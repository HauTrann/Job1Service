var express = require('express');
var router = express.Router();

var Network = require('../model/network');

router.post('/network/', function (req, res, next) {
    Network.add(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/network/:id', function (req, res, next) {
    Network.delete(req.params.id, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/network/:id', function (req, res, next) {
    Network.update(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;
