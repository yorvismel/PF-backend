const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

require("./db.js");

const server = express();

server.name = "API";

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use('/', router);

module.exports = server;