"use strict";

var express = require("express");

var mysql = require("mysql");

var http = require('http');

var cors = require("cors");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var bcrypt = require("bcrypt");

var saltRounds = 10;
var app = express();

var jwt = require('jsonwebtoken');

var secret = "meu-segredo"; //esse segredo do JWT seria uma config

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "formulario"
});
app.use(cors({
  origin: ["http://localhost:3005"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.get("/acesso", verifyJWT, function (req, res) {
  connection.query("SELECT * FROM tbformulario", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); //função que verifica se o JWT é ok

function verifyJWT(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({
    auth: false,
    message: 'Token não informado.'
  });
  jwt.verify(token, secret, function (err, decoded) {
    if (err) return res.status(500).send({
      auth: false,
      message: 'Token inválido.'
    });
    req.userId = decoded.id;
    console.log("User Id: " + decoded.id);
    next();
  });
} //rota de login


app.post('/auth', function (request, response) {
  var User = request.body.User;
  var Pass = request.body.Pass;

  if (User && Pass) {
    connection.query('SELECT * FROM tbformulario WHERE nome = ? AND senha = ?', [User, Pass], function (error, results, fields) {
      if (results.length > 0) {
        var id = 1; //esse id viria do banco de dados 

        var token = jwt.sign({
          id: id
        }, secret, {
          expiresIn: 300 // 5min 

        });
        response.status(200).send({
          auth: true,
          token: token
        }); // response.send('Altenticação realizado com sucesso!');
      } else {
        response.send('Nome de usuário ou Senha incorretos!');
      }

      response.end();
    });
  } else {
    response.send('Por favor, insira o nome de usuário e a senha!');
    response.end();
  }
}); //rota de logout

app.post('/logout', function (req, res) {
  console.log("Fez logout e cancelou o token!");
  res.status(200).send({
    auth: false,
    token: null
  });
});
var server = http.createServer(app);
server.listen(3001);
console.log("Servidor escutando na porta 3001...");