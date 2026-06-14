const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_USERNAME =
    process.env.ADMIN_USERNAME;

const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD;

router.post("/login", async (req, res) => {

    const {
        username,
        password
    } = req.body;

    if(
        username !== ADMIN_USERNAME ||
        password !== ADMIN_PASSWORD
    ){
        return res.status(401).json({
            message:
                "Invalid credentials"
        });
    }

    const token =
        jwt.sign(
            {
                username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

    res.json({
        token,
        username
    });

});

module.exports = router;