var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid');
var Home = require('../model/home');

router.post('/addContractMe', function (req, res, next) {
    const data = req.body;
    data.ID = uuidv4.v4();
    Home.addContractMe(req.body, function (err, count) {
        if (err) {
            res.status(400).json(null);
        } else {
            res.json({ status: 1 });
        }
    });
});

router.post('/getContractPage', function (req, res, next) {
    const { pageNumber, pageSize, searchText } = req.body;
    const offset = (pageNumber - 1) * pageSize;
    Home.getContractPage(offset, pageSize, searchText, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            Home.countRow(searchText, (errC, rowsC) => {
                if (errC) {
                    res.json(err);
                } else {
                    const data = {
                        content: rows,
                        pageNumber, pageSize,
                        totalElements: rowsC[0].Count
                    }
                    res.json(data);
                }
            })
        }

    });
});

module.exports = router;
