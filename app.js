const express = require("express");
const session = require("express-session");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const home =require('./routes/home');
const user = require('./routes/userRoute');
const admin = require('./routes/adminRoute');
const categ = require('./routes/cateroryRoute')


const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;

const dbconnect = require("./config/dbconnect");


dbconnect();

app.use(
  session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: true,
    })
  );


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(user);
app.use('/',home);
app.use('/admin',admin);
app.use('/category',categ);




app.listen(PORT,(req,res)=>{
    console.log(`Server is listening${PORT}`)

})
