/**
 * @author Amir Saleem
 * @description This file contains the core logic for express application
 */

const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const compression = require('compression');

const helperFunctions = require('../lib/etc/helper-functions');
const { printLog, httpRequestLogger } = helperFunctions;

const app = express();

// specify the maximum number of requests server can accept in a given interval of time

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: {
        api_status: "stable",
        version: "1.0",
        warning: "Too many requests, please try again after 1 minute"
    }
});

app.use(limiter);

// specify the hosts, methods and headers allowed by this server
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", '*,PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, allow-access");
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 10000 }));
app.use(compression());

app.use(httpRequestLogger);

module.exports = app;