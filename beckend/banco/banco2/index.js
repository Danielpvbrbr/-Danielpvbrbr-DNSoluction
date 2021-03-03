const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 8000; //porta padrão
const sql = require('mssql');
// const connStr = "Server=192.168.0.99;Database=Forponto;User Id=SistemaDP;Password=ConsultaPT1;";
const connStr = "Server=MRPAddNDA-PC\SQLEXPRESS;Database=DBGerenciador;User Id=sa;Password=1801;";

const cors = require("cors");
app.use(cors())
//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

router.get('/clientes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Clientes' + filter, res);
})


router.post('/clientess', (req, res) =>{
    const id = parseInt(req.body.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`INSERT INTO Clientes(ID, Nome, CPF) VALUES(${id},'${nome}','${cpf}')`, res);
})


router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM Clientes', res);
})

app.use('/', router);

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => {
    global.conn = conn;
        //inicia o servidor
        app.listen(port);
        console.log('API SQL funcionando!');
   })
   .catch(err => console.log(err));

   function execSQLQuery(sqlQry, res){
       global.conn.request()
        .query(sqlQry)
        .then(result => res.json(result.recordset))
        .catch(err => res.json(err));
   }
// const server = http.createServer(app); 
// server.listen(process.env.PORT || 8000);
// console.log("Servidor escutando na porta 3030...")