"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mysql = require('mysql');

var connection = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "",
  database: "formulario"
});
var app = express();
app.get("/user", function (req, res) {
  bcrypt.hash(cPass, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    }

    db.query("INSERT INTO tbformulario (nome, senha) VALUES (?,?)", [cUser, hash], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send("Valores inserido ao banco");
      }
    });
  });
}); // Iniciando o servidor.

app.listen(8080, function () {
  console.log('Vai no navegador e entra em http://localhost:3001/user pra ver os usuários cadastrados.');
});