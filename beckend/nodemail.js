const mailer = require("nodemailer");

module.exports = (email, name, mensagem) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, //SSL/TLS
        auth: {
            user: 'suporteesqueceusenha@gmail.com',
            pass: 'suporte#1801'
        }
    })
    
    const mail = {
        from: "Daniel <contato@dev.com.br>",
        to: email,
        subject: `${name} te enviou uma mensagem`,
        text: `${mensagem}`,
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}