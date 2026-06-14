const express = require("express");
const router = express.Router();

const prisma = require("../lib/prisma");

// GET ALL TEAMS
router.get("/", async (req, res) => {
    try {
        const teams = await prisma.team.findMany();

        res.json(teams);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

// GET TEAM BY TEAM ID
router.get("/id/:teamId", async (req, res) => {
    try {
        const team = await prisma.team.findUnique({
            where: {
                teamId: req.params.teamId
            }
        });

        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }

        res.json(team);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

// GET TEAM BY SLUG
router.get("/:slug", async (req, res) => {
    try {
        const team = await prisma.team.findUnique({
            where: {
                slug: req.params.slug
            }
        });

        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }

        res.json(team);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.get("/count/all", async (req, res) => {

    try {

        const count = await prisma.team.count();

        res.json({
            count
        });

    } catch(error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// GET TEAM ROSTER
router.get("/id/:teamId/roster", async (req, res) => {

    try {

        const players =
            await prisma.player.findMany({
                where: {
                    currentClubId:
                        req.params.teamId
                }
            });

        res.json(players);

    } catch(error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// CREATE TEAM
router.post("/", async (req, res) => {
    try {
        const team = await prisma.team.create({
            data: req.body
        });

        res.status(201).json(team);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
