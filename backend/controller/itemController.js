const db = require('../utils/db');

exports.getItems = (req, res, next) => {
  try {
    const sql = "SELECT * FROM items";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({ items: result });
    });
  } catch (err) {
      if(!err.statusCode){
        err.statusCode = 400;
      } 
      throw err
  }
};

exports.getItem = (req, res,next) =>{
    try{
        const sql =  `SELECT * FROM items WHERE id=${req.params.id}`;
        db.query(sql, (err, result) =>{
            if(err) throw err;
            res.status(200).json({item: result})
        })
    }catch(err){
        if(!err.statusCode){
            err.statusCode =400;
        }
        throw err;
    }
}


exports.addItem = (req, res,next) =>{
    try {
        const productName = req.body.productname;
        const category = req.body.category;
        const price = req.body.price;
        const description = req.body.description;
        const dateAdded = new Date();
        const dateEdited = new Date();
        const sql = `INSERT INTO items (productname, category,price,dateadded,dateedited, description) VALUES(?,?,?,?,?,?)`; 
        const item =[productName, category,price,dateAdded,dateEdited, description];
        
        db.query(sql, item,(err, result) => {
          if (err) throw err;
          const sql2 = `SELECT * FROM items WHERE id=${result.insertId}`;
          db.query(sql2, (err, item) =>{
            res.status(201).json({ message: "ITEM ADDED", item:item[0]});
          })
        });
    }catch(err) {
      if(!err.statusCode){
          err.statusCode = 422;
      }
      throw err;
    }
}

exports.deleteItem = (req, res, next)=>{
    try{
        const id = req.params.id;
        const sql = `DELETE FROM items WHERE id=${id}`;
        db.query(sql, (err, result) =>{
            if(err) throw err;
            res.status(200).json({message:"Item Deleted"})
        })
    }catch(err){
        if(err) throw err
    }

}

exports.updateItem = (req, res,next) =>{

    try{
        const id = req.params.id;
        const productname = req.body.productname;
        const category = req.body.category;
        const price = req.body.price;
        const dateadded = req.body.dateadded;
        const description = req.body.description;
        const dateedited = new Date();
        const setItem = {productname, category,price,dateadded,dateedited, description};
        const updatedItem = {id:parseInt(id), productname,category,price,dateadded,dateedited, description}
        const sql = `UPDATE items SET ? WHERE id=${id}`;
        db.query(sql, setItem ,(err, result) =>{
            if(err) throw err;
            res.status(200).json({message: 'Item Updated', item:updatedItem})
        })

    }catch(err){
        if(!err.statusCode){
            err.statusCode = 400;
        }
        throw err;
    }

}