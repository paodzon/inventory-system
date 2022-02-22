const db = require('../utils/db');

exports.createdb = (req,res,next) =>{
    const sql = 'CREATE DATABASE inventorysystem';

    db.query(sql, (error, result) =>{
        if(error) throw error;
        console.log(result);
        res.send('DATABASE CREATED');
    })
}

exports.createTable = (req,res,next) =>{
    const sql = 'CREATE TABLE items(id int AUTO_INCREMENT PRIMARY KEY, productname VARCHAR(255), category VARCHAR(255), price DECIMAL(10,2),description VARCHAR(255), dateadded datetime, dateedited datetime, FOREIGN KEY (category) REFERENCES categories(category) ON UPDATE CASCADE ON DELETE CASCADE)';
    db.query(sql, (err,result) =>{
        if(err) throw err;
        console.log(result)
        res.status(201).send('TABLE CREATED')
    })
}


exports.createCategory = (req, res,next) =>{
    const sql= 'CREATE TABLE categories(id int AUTO_INCREMENT PRIMARY KEY, category VARCHAR(255))';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.status(201).send('Category Table Added');
    })
}