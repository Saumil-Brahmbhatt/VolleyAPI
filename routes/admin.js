const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_USERNAME = "Saumil";

const ADMIN_PASSWORD = "Saumil12911";

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