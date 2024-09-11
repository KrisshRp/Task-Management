var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

require("./Bin/env/env");
require('./Database/config/connection');

var app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
