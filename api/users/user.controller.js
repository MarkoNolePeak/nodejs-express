const { create, getUserByUserId, getUsers, updateUser, deleteUser, getUserByEmail } = require('./user.service');

const {genSaltSync, hashSync, compareSync} = require("bcrypt");

const {sign, JsonWebTokenError} = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");

let refreshTokens = [];

module.exports = {
    createUser : (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        create(body,(err,results)=>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"

                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });

        });
    },
    getUserByUserId : (req,res)=>{
        const id = req.params.id;
        getUserByUserId(id,(err,results)=>{
            if(err){
                console.log(err)
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    getUsers : (req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    updateUsers : (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err)
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message: "Failed to update user"
                });
            }
            return res.json({
                success:1,
                message:"updated successfully"
            });
        });
    },
    deleteUser : (req,res)=>{
        const data = req.body;
        deleteUser(data,(err,results)=>{
            if(err){
                console.log(err)
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                message:"user deleted successfully"
            });
        });
    },
    login: (req,res)=>{
        const body = req.body;
        getUserByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    message:"Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password=undefined;
                const jsontoken = sign({result:results},'qwe1234',{
                    expiresIn:"15s"
                });
                const refreshtoken = sign({result:results},'qwe4567',{
                    expiresIn:"1h"
                });
                refreshTokens.push(refreshtoken);
                return res.json({
                    success:1,
                    message:"Login successfully",
                    token: jsontoken,
                    refreshToken: refreshtoken
                });
            } else {
                return res.json({
                    success: 0,
                    message:"Invalid email or password"
                });
            }
        });
    },
    token : (req,res)=>{
        const refreshToken = req.body.token;
        if(refreshToken == null) return res.sendStatus(401)
        if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
        verify(refreshToken,'qwe4567',(err,user)=>{
            if(err) return res.sendStatus(403)
            const accessToken = sign({result:user.email},'qwe1234',{
                expiresIn:"5m"
            });
            return res.json({ accessToken: accessToken});
        })

    },
    logout: (req,res)=>{
        refreshTokens = [];
        res.sendStatus(204)
    }
    
};