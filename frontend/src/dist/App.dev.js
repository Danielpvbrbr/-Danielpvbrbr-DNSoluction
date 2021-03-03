"use strict";

var express = require('express'); //importacao do pacote


var app = express(); //instanciando express

app.get('/', function (req, res) {
  //endereco da requisicao onde e retornado hello world
  res.send('Hello World');
});
app.listen(3000); //execucao do servidor