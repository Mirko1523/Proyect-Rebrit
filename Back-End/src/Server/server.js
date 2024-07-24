const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require('../Routes/userRoutes');

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use('/api', userRoutes);

module.exports = server;
