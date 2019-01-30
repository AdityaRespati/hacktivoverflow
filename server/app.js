var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
var indexRouter = require('./routes/index');
var app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/overflow', {useNewUrlParser: true}, (err) => {
  if(err){console.log("db connection error: ", err)}
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//basic route
app.use('/', indexRouter);


module.exports = app;
