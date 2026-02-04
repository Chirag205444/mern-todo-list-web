const cookieParser = require('cookie-parser');
const express=require('express');
const cors = require("cors");
require("dotenv").config();
const db=require("./config/mongooseConnection")
const app=express();
const {path} =require('path')

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

const UserRoute=require("./routes/UserRoute")
const ToDoRoute=require("./routes/ToDoRoute")
const {authMiddleware}=require("./middlewares/auth");

app.use("/user",UserRoute)
app.use("/todo",authMiddleware,ToDoRoute);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`${PORT}`);
});