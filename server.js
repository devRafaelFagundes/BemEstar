require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const path = require("path");
const homeRouter = require("./routes/beforeLogin");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded());

//views and public folders
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('', homeRouter);

app.listen(3000, ()=>{
    console.log("port 3000 in open state");
})
connectToDb();