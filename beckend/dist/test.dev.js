"use strict";

var Sequelize = require('sequelize');

var sequelize = new Sequelize('formulario', 'root', '', {
  hsot: "localhost",
  dialect: 'mysql'
});
sequelize.authenticate().then(function () {
  console.log("Conectado com sucesso!");
})["catch"](function (error) {
  console.log("Falha ao se conectar" + erro);
});