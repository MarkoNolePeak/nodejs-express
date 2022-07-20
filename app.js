require("dotenv").config();
const express = require ("express");
const app = express();

const userRouter = require("./api/users/user.router");
const {insert, all,remove} = require("./news/news.controler");

const {test} = require("./news/middleware");
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());

app.use("/api/users",userRouter);

app.post("/news/insert",test,insert);
app.get("/news/all",all);
app.delete("/news/delete/:id",remove);


app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running on PORT: ",process.env.APP_PORT);
})