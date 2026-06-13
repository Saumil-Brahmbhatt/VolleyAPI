const express = require("express");
const router = express.Router();

const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");

// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const admin = await prisma.admin.findUnique({
            where: {
                username
            }
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        if (password !== admin.password) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                adminId: admin.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            token
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;
