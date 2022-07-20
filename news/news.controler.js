const pool = require("../config/database");
const express = require ("express");


const insert = (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const sqlInsert = "INSERT INTO news (title, description, date) VALUES (?,?,?)";
    pool.query(sqlInsert,[title, description,date],(err,result)=>{
        res.send(result);
    });
}

const all = (req,res)=>{
   const sql = `select * from news`;
   pool.query(sql,[],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
   });
}

const remove = (req,res)=>{
    const id = req.params.id;
    console.log(id);
    const sqldelete = `DELETE from news where id = ?`; 
    pool.query(sqldelete,[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                message: "deeleted news"
            });
        }
    });
}

module.exports = {insert, all, remove}