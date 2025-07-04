require("dotenv").config();

const express = require("express");
const path = require("path");
const cookie = require('cookie-parser')
const cors = require("cors");


const homeRouter = require("./routes/beforeLogin");
const authRouter = require("./routes/autenticationRoutes")
const appRouter = require("./routes/appProfessional")
const apiRouter = require("./routes/apisRoutes")

const connectToDb = require("./database/db");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.json())
app.use(cookieParser())

//views and public folders
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/auth', authRouter)
app.use('/app', appRouter);
app.use('', homeRouter);
app.use('/api', apiRouter);

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