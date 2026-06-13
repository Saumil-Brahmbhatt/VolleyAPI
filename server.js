const express = require("express");
const cors = require("cors");

const playerRoutes = require("./routes/players");
const teamRoutes = require("./routes/teams");

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

app.get("/health", (req, res) => {
  res.json({
    status: "healthy"
  });
});

app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/teams", teamRoutes);

const PORT = process.env.PORT || 1209;

module.exports = app;
