/*Lembrar de usar no Git Bash: PS1='\u@\h:\w$ '

*/

require("dotenv").config();

const db = require("./db.js");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.listen(port);

console.log("Sistema rodando...");