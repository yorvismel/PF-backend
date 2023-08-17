const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const app = express
require("./db.js");

const server = express();

server.name = "API";

// Configuración de CORS para permitir solicitudes desde tu dominio frontend en producción
const allowedOrigins = ['https://pf-frontend-weld.vercel.app', 'https://pf-backend-nwu9.onrender.com'," http://localhost:5173", "http://localhost:3001"]; // Agrega todos los dominios permitidos
server.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));

server.use(morgan("dev"));
server.use(express.json());

server.use('/', router);

module.exports = server;
