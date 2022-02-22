const db = require('../utils/db');

exports.getCategories = (req, res,next) =>{
    try{
        const sql = 'SELECT * FROM categories';
        db.query(sql, (err, result) =>{
            if(err) throw err;
            res.status(200).json({categories: result})
        })
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 400;
        }
        throw err
    }
}

exports.addCategory = (req, res,next) =>{
    try{
        const category = req.body.category;
        const sql = `INSERT INTO categories (category) VALUES(?)`;
        db.query(sql,category,(err, result) =>{
            if(err) throw err;
            const newCategory = {id: result.insertId, category: category}
            res.status(201).json({message:'CATEGORY ADDED',category: newCategory});
            
        })
    }catch(err){
        if(!err.statusCode){
            err.statusCode =422;
        }
        throw err
    }
}



exports.deleteCategory = (req, res, next) =>{
    try{
        const id = req.params.id;
        const category = req.body.category;
        const sql = `DELETE FROM categories WHERE id=${id}`;
        console.log(category)
        db.query(sql, (err, result) =>{
            if(err) throw err;
            res.status(200).json({message:'Deleted Category', deleted:category})
        })
    }catch(err){
        if(!err) throw err;
    }
}

exports.updateCategory = (req, res, next) =>{

    try{    
        const id = req.params.id;
        const category = req.body.category;
        const sql = `UPDATE categories SET category='${category}' WHERE id=${id}`;
        const newCategory = {id:parseInt(id), category}
        db.query(sql, (err, result) =>{
            if(err) throw err;
            res.status(200).json({message:"Category Updated", category:newCategory})
        })
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 400
        }
        throw err;
    }

}


exports.getCategory = (req,res,next) =>{
    try{
        const id = req.params.id;
        const sql = `SELECT * FROM categories WHERE id=${id}`

        db.query(sql, (err,result) =>{
            if(err) throw err;
            res.status(200).json({category: result})
        })
    }catch(err){
        if(!err.statusCode){
            err.statusCode =400;
        }
        throw err
    }
}