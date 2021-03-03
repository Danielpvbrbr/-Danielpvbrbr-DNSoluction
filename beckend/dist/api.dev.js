"use strict";

var http = require('http');

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(require("cors")());
app.use(bodyParser.json());
app.get('/', function (req, res, next) {
  res.json({
    message: "Tudo ok por aqui!"
  });
});
app.post('/api/form', function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var mensagem = req.body.mensagem;

  require("./nodemail")(email, name, mensagem).then(function (response) {
    return res.json(response);
  })["catch"](function (error) {
    return res.json(error);
  });
});
var server = http.createServer(app);
server.listen(process.env.PORT || 3030);
console.log("Servidor escutando na porta 3030...");