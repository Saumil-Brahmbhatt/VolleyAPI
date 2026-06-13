const express = require("express");
const router = express.Router();

const prisma = require("../lib/prisma");
const auth = require("../middleware/auth");

// GET ALL PLAYERS
router.get("/", async (req, res) => {

    try {

        const players = await prisma.player.findMany();

        res.json(players);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// GET PLAYER BY PLAYER ID
router.get("/id/:playerId", async (req, res) => {

    try {

        const player = await prisma.player.findUnique({
            where: {
                playerId: req.params.playerId
            }
        });

        if (!player) {

            return res.status(404).json({
                message: "Player not found"
            });

        }

        res.json(player);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// GET PLAYER BY SLUG
router.get("/:slug", async (req, res) => {
    try {
        const player = await prisma.player.findUnique({
            where: {
                slug: req.params.slug
            }
        });

        if (!player) {
            return res.status(404).json({
                message: "Player not found"
            });
        }

        res.json(player);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

// CREATE PLAYER
router.post("/", auth, async (req, res) => {
    try {

        const player = await prisma.player.create({
            data: req.body
        });

        res.status(201).json(player);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});

// DELETE PLAYER
router.delete("/:id", auth, async (req, res) => {
    try {

        await prisma.player.delete({
            where: {
                id: req.params.id
            }
        });

        res.json({
            message: "Player deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
});

module.exports = router;
