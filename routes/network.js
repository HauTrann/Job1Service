var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const uuidv4 = require('uuid');

var Network = require('../model/network');
router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        Network.getNetWorkById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Network.getAllNetWork(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});

router.get('/members/:networkID', function (req, res, next) {
    if (req.params.networkID) {
        Network.getMembers(req.params.networkID, function (err, rows) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        res.status(400).json(null);
    }
});

router.post('/getPage', auth, function (req, res, next) {
    const { pageNumber, pageSize, searchText } = req.body;
    const offset = (pageNumber - 1) * pageSize;
    Network.getAllNetWorkPage(offset, pageSize, searchText, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            Network.countRow(searchText, (errC, rowsC) => {
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

router.get('/getFile/:id', function (req, res, next) {
    try {
        Network.getFileByID(req.params.id, function (err, rows) {
            if (err) {
                res.status(400).json(err);
            } else {
                if (rows.length === 0 || !rows[0].ICONDATA) {
                    res.status(400).json(err);
                } else {
                    var fileData = Buffer.from(rows[0].ICONDATA);
                    res.writeHead(200, {
                        'Content-Type': 'image/png',
                        'Content-Disposition': 'attachment; filename=data.png',
                        'Content-Length': fileData.length
                    });
                    res.write(fileData);
                    res.end();
                }
            }
        });
    } catch (error) {

    }
});

router.post('/addNew', auth, function (req, res, next) {
    const data = req.body;
    data.ID = uuidv4.v4();
    data.USERCREATE = req.user.userID;
    Network.add(data, function (err, rows) {
        if (err) {
            res.status(400).json(err);
        } else {
            if (data.members && data.members.length > 0) {
                Network.addMemember(data.members, data.ID, (errAddMember, rowsAddMember) => {
                    if (errAddMember) {
                        res.status(400).json(err);
                    } else {
                        res.json({ status: 1 });
                    }
                });
            } else {
                res.json({ status: 1 });
            }
        }

    });
});

router.post('/update', auth, function (req, res, next) {
    const data = req.body;
    data.USERMODIFY = req.user.userID;
    data.ICONDATA = Buffer.from(data.ICON.split(",")[1], "base64");
    Network.update(data, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            Network.deleteMember(data.ID, (errAddMember, rowsAddMember) => {
                if (errAddMember) {
                    res.status(400).json(err);
                } else {
                    if (data.members && data.members.length > 0) {
                        Network.addMemember(data.members, data.ID, (errAddMember, rowsAddMember) => {
                            if (errAddMember) {
                                res.status(400).json(err);
                            } else {
                                res.json({ status: 1 });
                            }
                        });
                    } else {
                        res.json({ status: 1 });
                    }
                }
            });
        }
    });
});

router.post('/delete', auth, function (req, res, next) {
    const data = req.body;
    if (data.ID) {
        Network.deleteMember(data.ID, (errAddMember, rowsAddMember) => {
            if (errAddMember) {
                res.status(400).json(errAddMember);
            } else {
                Network.delete(data.ID, function (err, rows) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.json({ status: 1 });
                    }
                });
            }
        });
    } else {
        res.status(400).json(err);
    }
});

router.post('/:id?', function (req, res, next) {
    if (req.params.id) {
        Network.getNetWorkById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Network.getAllNetWork(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});

router.post('/register', function (req, res, next) {
    Network.add(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    Network.delete(req.params.id, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', function (req, res, next) {
    Network.update(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;
