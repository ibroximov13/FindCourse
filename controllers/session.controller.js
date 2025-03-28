const { Session } = require("../models");
require("dotenv");
const jwt = require("jsonwebtoken");

const getAllSessions = async (req, res) => {
    try {
        let sessions = await Session.findAll();
        if (!sessions || sessions.length === 0) {
            return res.status(404).send({ message: "Sessions not found" });
        }
        res.send(sessions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getMySession = async (req, res) => {
    try {
        let authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(400).send({ message: "Token not found" });
        }

        let token = authHeader.split(" ")[1];

        if (authHeader.startsWith("Bearer Bearer ")) {
            token = authHeader.split(" ")[2];
        }

        if (!token) {
            return res.status(400).send({ message: "Token not found" });
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        let session = await Session.findAll({ where: { userId: verifyToken.id } });

        if (!session || session.length === 0) {
            return res.status(404).send({ message: "Session not found" });
        }

        res.send(session);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getOneSession = async (req, res) => {
    try {
        let id = req.params.id;
        let session = await Session.findOne({ where: { id } });

        if (!session) {
            return res.status(404).send({ message: "Session not found" });
        }

        res.send(session);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteSession = async (req, res) => {
    try {
        let id = req.params.id;
        let session = await Session.findOne({ where: { id } });

        if (!session) {
            return res.status(404).send({ message: "Session not found" });
        }

        await session.destroy();
        res.send({ message: "Session deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAllSessions, getMySession, getOneSession, deleteSession };