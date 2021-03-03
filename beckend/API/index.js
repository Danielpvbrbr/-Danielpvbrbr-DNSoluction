const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const sql = require('mssql');
const connStr = {
    user: 'SistemaDP',
    password: 'ConsultaPT1',
    server: '192.168.0.99',
    database: 'Forponto',
    "options": {
      "encrypt": false,
      "enableArithAbort": false,
      },
    // port: 1433,
 };
//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

router.get('/clientes', (req, res) =>{
    execSQLQuery(`SELECT FUNC.DFFUNCRACHA,FUNC.DFFUNNOME, APONT.DFFUAINICIO, APONT.DFFUATERMINO, TAPONT.DFMTVCODIGO, TAPONT.DFMTVDESCRICAO,
    format(ROUND(APONT.DFFUATEMPO/60,0,1) % 60,'00')+':'+format(ROUND(APONT.DFFUATEMPO,0,1) % 60,'00') as 'horas_abonadas', APONT.DFFUATEMPO
    FROM [FORPONTO].[FORPONTO].[PMTVFPTO] TAPONT,[FORPONTO].[FORPONTO].[PFUAFPTO] APONT,[FORPONTO].[FORPONTO].[PFUNFPTO] FUNC
    WHERE APONT.DFFUNCRACHA LIKE '950360'
    AND APONT.DFFUNCRACHA = FUNC.DFFUNCRACHA
    AND APONT.DFMTVCODIGO = TAPONT.DFMTVCODIGO
    ORDER BY APONT.DFFUAINICIO`, res);
})



router.patch('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
})

app.use('/', router);

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => {
        global.conn = conn;
        //inicia o servidor
        app.listen(port);
        console.log('API funcionando!');
   })
   .catch(err => console.log(err));

function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}