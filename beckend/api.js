const express = require("express");
const mysql = require("mysql");
const http = require('http');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
var jwt = require('jsonwebtoken');
const secret = "meu-segredo"; //esse segredo do JWT seria uma config
app.use(require("cors")());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "dns_teste",
});

app.use(
    cors({
      origin: ["http://localhost:3005"],
      methods: ["GET", "POST"],
      credentials: true,
    })
);

//Requisição que envia email para usuario  
app.post('/api/form',(req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    require("./nodemail")(email, name, mensagem)
    .then(response => res.json(response))
    .catch(error => res.json(error));
        
})
//Fim requisição que envia email para usuario  

//Requisição que traz as informações de cadastro
app.get("/listjust", (req, res) => {
    connection.query("SELECT * FROM tbjustificativas", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/acesso", (req, res) => {
    connection.query("SELECT * FROM tbformulario", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get("/cadastro", (req, res) => {
    connection.query("SELECT * FROM listasdeusuarios", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
//Fim das requisição que traz as informações de cadastro

//Requisição que ferifica sé usuario esta atenticado ao token
app.get("/isUserAuth", verifyJWT, (req, res) => {
    res.send("User autenticado")
});

//Função que verifica se o JWT é ok
function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(401).send({
        auth: false,
        message: 'Token não informado.'
      });
  
    jwt.verify(token, secret, function (err, decoded) {
      if (err)
        return res.status(500).send({
          auth: false,
          message: 'Token inválido.'
        });
  
      req.userId = decoded.id;
      console.log("User Id: " + decoded.id)
      next();
    });
  }
  
  //função que realiza registros no banco de dados (usuario)
  app.post("/register", (req, res) => {
    const cUser = req.body.cUser;
    const cPass = req.body.cPass;
  
    bcrypt.hash(cPass, saltRounds, (err, hash, res) => {
      if (err) {
        console.log(err);
      }
      connection.query(
        "INSERT INTO tbformulario (nome, senha) VALUES (?,?)",
        [cUser, hash],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // res.send(result);
          }
        }
      );
    });
  });
  //Fim do Registro no banco de dados (usuario)
  
  app.post("/checkbox-save", (req, res) => {
    const checkData = req.body.checkData;
      connection.query(
        "INSERT INTO checkbox (campo) VALUES (?)",
        [checkData],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
             res.send(result);
          }
        }
      );
    });
  

  //função que realiza registros de feedbaks no banco de dados (Relatorio)
  app.post("/createjust", (req, res) => {
    const nome = req.body.nome;
    const matricula = req.body.matricula;
    const setor = req.body.setor;
    const funcao = req.body.funcao;
    const date_ocor = req.body.date_ocor;
    const campjust = req.body.campjust;
    const data_hora = req.body.data_hora;
    connection.query(
        "INSERT INTO tbjustificativas (matricula, nome, setor, campo_just, data_ocorrencia, data_hora_atual, funcao) VALUES (?,?,?,?,?,?,?)",
        [matricula, nome, setor, campjust, date_ocor, data_hora, funcao ], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
});
//Fim do Registro no banco de dados (Relatorio)   
  
//função que realiza registros no banco de dados (usuario)
app.post("/cadastrar", (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const username = req.body.username;
    const nascimento = req.body.nascimento;
    const password = req.body.password;
    const celular = req.body.celular;
    const cpf = req.body.cpf;
  
    bcrypt.hash(password, saltRounds, (err, hash, res) => {
      if (err) {
        console.log(err);
      }
      connection.query(
        "INSERT INTO listasdeusuarios (nome, email, username, nascimento, password, celular, cpf) VALUES (?,?,?,?,?,?,?)",
        [nome, email, username, nascimento, hash, celular, cpf],
        (err, result) => {
          console.log(err);
   
        }
      );
    });
  });
  //Fim do Registro no banco de dados (usuario)
  
  
  //Rota de login
  app.post('/auth', function (request, response) {
    var User = request.body.User;xx
    var Pass = request.body.Pass;
    if (User && Pass) {
      connection.query('SELECT * FROM tbformulario WHERE nome = ? AND senha = ?', [User, Pass], function (error, results, fields) {
        if (results.length > 0)  {
          // response.send( 'Altenticação realizado com sucesso!.')
          const id = 1; //esse id viria do banco de dados 
          var token = jwt.sign({
            id
          }, secret, {
            expiresIn: 300 // 5min 
          });
  
          response.status(200).send({
            auth: true,
            token: token
          })
          
  
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
 
  //Rota de logout
  app.post('/logout', function (req, res) {
    console.log("Fez logout e cancelou o token!");
    res.status(200).send({
      auth: false,
      token: null
    });
  });
  
const server = http.createServer(app); 
server.listen(process.env.PORT || 3030);
console.log("Servidor escutando na porta 3030...")





// const connStr = {
//     user: 'sa',
//     password: '1801',
//     server: 'MRPANDA-PC\SQLEXPRESS', 
//     database: 'DBGerenciador',
//     "options": {
//       "encrypt": true,
//       "enableArithAbort": true
//       }
//  };