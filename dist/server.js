"use strict";
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookie = require('cookie-parser');
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const homeRouter = require("./routes/beforeLogin");
const authRouter = require("./routes/autenticationRoutes");
const appRouter = require("./routes/appProfessional");
// const apiRouter = require("./routes/apisRoutes")
const clientsRouter = require('./routes/clientsRoutes');
const meetingsRouter = require('./routes/meetingsRoutes');
const renderRouter = require('./routes/renderRoutes');
const connectToDb = require("./database/db");
const cookieParser = require("cookie-parser");
const app = express();
//views and public folders
app.set("views", path.resolve(__dirname, '../views'));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        error: "Too many requests"
    }
});
app.use(limiter);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//routers
app.use('/', renderRouter);
app.use('/auth', authRouter);
app.use('/app', appRouter);
app.use('', homeRouter);
// app.use('/api', apiRouter);
app.use('/clients', clientsRouter);
app.use('/meetings', meetingsRouter);
//global error handling middleware
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.message || 'error';
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.status
    });
});
app.listen(3000, () => {
    console.log("port 3000 in open state");
});
connectToDb();
module.exports = app;
//# sourceMappingURL=server.js.map