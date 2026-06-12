const express = require("express");
const cors = require("cors");

const playerRoutes = require("./routes/players");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        name: "VolleyAPI",
        version: "2.0",
        status: "Running"
    });

});

app.use("/api/v1/players", playerRoutes);

const PORT = process.env.PORT || 1209;

module.exports = app;
