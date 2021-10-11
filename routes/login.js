const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const UsersDB = require('../model/user');
const Utils = require('../utils/utils');
router.post("/", async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        let user = null;
        UsersDB.getUserByEmail(email, (err, rows) => {
            if (err) {
                res.status(400).send("Invalid Credentials");
            } else {
                if (rows.length > 0) {
                    user = rows[0];
                }
                const hash = Utils.hash(email, password);
                if (user && (hash === user.PASSWORD)) {
                    // Create token
                    const token = jwt.sign(
                        { userID: user.ID, email },
                        Utils.tokenKey,
                        Utils.tokenExpiration
                    );

                    // save user token
                    user.token = token;
                    // user respone
                    const Userespone = {
                        id: user.ID,
                        token: token
                    }
                    res.status(200).json(Userespone);
                } else {
                    res.status(400).send("Invalid Credentials");
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    // Our register logic ends here
});

module.exports = router;