"use strict";

var mailer = require("nodemailer");

module.exports = function (email, name, mensagem) {
  var smtpTransport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    //SSL/TLS
    auth: {
      user: 'suporteesqueceusenha@gmail.com',
      pass: 'suporte#1801'
    }
  });
  var mail = {
    from: "Daniel <contato@dev.com.br>",
    to: email,
    subject: "".concat(name, " te enviou uma mensagem"),
    text: "".concat(mensagem) //html: "<b>Opcionalmente, pode enviar como HTML</b>"

  };
  return new Promise(function (resolve, reject) {
    smtpTransport.sendMail(mail).then(function (response) {
      smtpTransport.close();
      return resolve(response);
    })["catch"](function (error) {
      smtpTransport.close();
      return reject(error);
    });
  });
};