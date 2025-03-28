require("dotenv").config();

const db = require("./db.js");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.listen(port);

console.log("Sistema rodando...");
