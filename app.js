const express = require("express");
const path = require("path");

const app = express();

const rides = [];
let nextId = 1;

const commit = (
    process.env.RENDER_GIT_COMMIT ||
    process.env.GIT_SHA ||
    "local"
).slice(0, 7);

app.use(express.json());

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "public", "index.html");

    res.sendFile(filePath);
});

app.get("/api/rides", (req, res) => {
    res.json(rides);
});

app.post("/api/rides", (req, res) => {
    const { name, from, to, time } = req.body;

    if (!name || !from || !to || !time) {
        return res.status(400).json({
            error: "Name, from, to and time are required"
        });
    }

    const ride = {
        id: nextId++,
        name,
        from,
        to,
        time
    };

    rides.push(ride);

    res.status(201).json(ride);
});

app.delete("/api/rides/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = rides.findIndex((ride) => ride.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Ride not found"
        });
    }

    rides.splice(index, 1);

    res.json({
        message: "Ride deleted successfully"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        commit
    });
});

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;