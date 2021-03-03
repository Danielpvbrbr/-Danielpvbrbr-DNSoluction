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
var app = express(); //rota GET que retorna os dados da tabela usuários.

app.get('/user', function (req, res) {
  // Conectando ao banco.
  connection.getConnection(function (err, connection) {
    // Executando a query MySQL (selecionar todos os dados da tabela usuário).
    connection.query('SELECT * FROM tbformulario', function (error, results, fields) {
      // Caso ocorra algum erro, não irá executar corretamente.if (error) throw error;
      // Pegando a 'resposta' do servidor pra nossa requisição. Ou seja, aqui ele vai mandar nossos dados.
      res.send(results);
    });
  });
}); // Iniciando o servidor.

app.listen(3001, function () {
  console.log('Vai no navegador e entra em http://localhost:3001/user pra ver os usuários cadastrados.');
});