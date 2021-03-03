"use strict";

var express = require("express");

var mysql = require("mysql");

var cors = require("cors");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var session = require("express-session");

var bcrypt = require("bcrypt");

var saltRounds = 10;
var app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3005"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24
  }
}));
app.get('/', function (req, res, next) {
  res.json({
    message: "Serviço Ativo!"
  });
});
var db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "formulario"
});
app.post("/register", function (req, res) {
  var cUser = req.body.cUser;
  var cPass = req.body.cPass;
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
});
app.get("/user", function (req, res) {
  db.query("SELECT * FROM tbformulario", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
var PORT = process.env.PORT || 3001;
app.listen(process.env.PORT || 3001);
console.log('Servidor escutando na porta ' + PORT);