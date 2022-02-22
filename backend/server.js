const express = require('express');
const bodyParser = require('body-parser');
const formRouter = require('./routes/formRoutes');
const dbRouter = require('./routes/dbRoutes');
const db = require('./utils/db');

const app = express();

app.use(bodyParser.json());


app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use('/db', dbRouter);
app.use('/forms',formRouter);


db.connect((err) =>{
    if(err){
        throw err;
    }
    app.listen(8080)
    console.log('DATABASE IS CONNECTED')
})

app.use((error, req,res,next) =>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message});
})
