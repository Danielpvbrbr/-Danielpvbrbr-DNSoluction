"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var http = require('http');

app.use(require("cors")());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.post('http://localhost:3030', function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.mensage;

  require("./nodemail")(email, name, message).then(function (response) {
    return res.json(response);
  })["catch"](function (error) {
    return res.json(error);
  });
});
app.get('/', function (req, res, next) {
  res.json({
    message: "Tudo ok por aqui!"
  });
});
var server = http.createServer(app);
server.listen(process.env.PORT || 3030);
console.log("Servidor escutando na porta 3030...");