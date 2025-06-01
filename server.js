require("dotenv").config();

const express = require("express");
const path = require("path");

const homeRouter = require("./routes/beforeLogin");
const authRouter = require("./routes/autenticationRoutes")

const connectToDb = require("./database/db");

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.json())

//views and public folders
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('', homeRouter);
app.use('/auth', authRouter)

//global error handling middleware
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.message || 'error';
    res.status(error.statusCode).json({
        status : error.status,
        message : error.message
    })
})

app.listen(3000, ()=>{
    console.log("port 3000 in open state");
})
connectToDb();