require("dotenv").config();
const express = require("express");
const path = require("path");
const homeRouter = require("./routes/beforeLogin");
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "views")));

app.use('', homeRouter);

app.listen(3000, ()=>{
    console.log("port 3000 in open state");
})