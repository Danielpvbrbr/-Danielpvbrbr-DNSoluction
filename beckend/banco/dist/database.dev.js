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
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.get('/', function (req, res, next) {
  res.json({
    message: "Serviço Ativo!"
  });
});
app.post("/register", function (req, res) {
  var cUser = req.body.cUser;
  var cPass = req.body.cPass; // const	cAcess = req.body.cAcess;

  bcrypt.hash(cPass, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    }

    connection.query("INSERT INTO tbformulario (nome, senha) VALUES (?,?)", [cUser, hash], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send("Cadastro realizado com sucesso!!");
      }
    });
  });
});
app.get("/cadastro", function (req, res) {
  connection.query("SELECT * FROM listasdeusuarios", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/cadastrar", function (req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var username = req.body.username;
  var nascimento = req.body.nascimento;
  var password = req.body.password;
  var celular = req.body.celular;
  var cpf = req.body.cpf;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    }

    connection.query("INSERT INTO listasdeusuarios (nome, email, username, nascimento, password, celular, cpf) VALUES (?,?,?,?,?,?,?)", [nome, email, username, nascimento, hash, celular, cpf], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send("Cadastro relizado com sucesso!!");
      }
    });
  });
});
app.post('/auth', function (request, response) {
  var User = request.body.User;
  var Pass = request.body.Pass;

  if (User && Pass) {
    bcrypt.hashSync(Pass, salt) === rows[0].senha;
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
        }); // console.log('Altenticação realizado com sucesso!');
      } else {
        response.send('Nome de usuário ou Senha incorretos!');
      }

      response.end();
    });
  } else {
    response.send('Por favor, insira o nome de usuário e a senha!');
    response.end();
  }
});
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
} //fim do sessão


app.get("/acesso", function (req, res) {
  connection.query("SELECT * FROM tbformulario", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post('/logout', function (req, res) {
  res.json({
    auth: false,
    token: null
  });
});
var server = http.createServer(app);
server.listen(3001);
console.log("Servidor escutando na porta 3001...");