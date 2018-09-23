/**
 * @author Amir Saleem
 * @description This file contains the core logic for express application
 */

const express = require('express');
const rateLimit = require('express-rate-limit');

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

module.exports = app;