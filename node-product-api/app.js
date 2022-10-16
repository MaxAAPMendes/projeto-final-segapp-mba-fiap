const http = require('http');
const { auth,} = require('express-oauth2-jwt-bearer');
const express = require('express');
const rotas = require('./routes');
require('dotenv').config();
const login = require('./middleware/login');

const app = express()
const port = 3002

const db = require("./db");

var cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');

rotas(app);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser());

// const checkJwt = auth({
//    audience: 'http://localhost:3000', // Chamadores habilitados
//    issuerBaseURL: `http://dev-7faaj9l0.us.auth0.com`,
// });

// app.use(function(req, res, next) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
//    res.setHeader('Access-Control-Allow-Credentials', true);
//    next();
// });


// app.get('/users', checkJwt, (req, res) => {
//     res
//     .status(200)
//     .send({
//         status: 'OK',
//         mensage: 'Página de usuários',
//     })
// })

app.get('/products', login, async (req, res, next) => {
    console.log('consultando todos os produtos')
    var resp = await db.getAllProducts();
    res.status(200).json(resp);
});

app.post('/products', login, async (req, res, next) => { 

    try{
        var name = req.body.name;
        var description = req.body.description
        var value = req.body.value
        
        await db.insertProduct(name, description, value);
        return res.status(200).json({message: 'Produto cadastrado com sucesso!'});

    }catch(err){
        return res.status(err.code).json(err);
    }
});


app.get('/products/:id', login, async (req, res, next) => { 

    try{
        var id = req.params.id;
        const [rows] = await db.getProductById(id);
        if(rows){
            return res.status(200).send(rows);
        }
        return res.status(404).send(`Produto ${id} não encontrado!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.put('/products/:id', login, async (req, res, next) => { 

    try{
        var id = req.params.id;

        var name = req.body.name;
        var description = req.body.description
        var value = req.body.value
        
        const rows = await db.updateProductById(id, name, description, value);
        if(rows){
            return res.status(200).send({message: "Produto atualizado com sucesso!"});
        }
        return res.status(404).send(`Produto ${id} atualizado com sucesso!`);
    }catch(err){
        return res.status(err.code).json(err);
    }
});

app.delete('/products/:id', login, async (req, res, next) => {

    try{
        var id = req.params.id;
        await db.deleteProductById(id);
        return res.status(200).send({message: `Produto ${id} deletado com sucesso!`}); 

    }catch(err){
        return res.status(err.code).json(err);
    }
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
