"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarSenha = mostrarSenha;

function mostrarSenha() {
  var tipo = document.getElementById("senha");

  if (tipo.type == "password") {
    tipo.type = "text";
  } else {
    tipo.type = "password";
  }
}