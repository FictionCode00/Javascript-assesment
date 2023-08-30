var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { ConnectDB } =require( './config/dbCOnfig');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contact');
const  mongoose  = require('mongoose');
const ErrorHandler = require('./utils/errorHandler');
var app = express();
require('dotenv').config()
var PORT= process.env.PORT || 8080

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
ConnectDB();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(ErrorHandler);

mongoose.connection.once("open",()=>{
  console.log(`Mongoose connected successfully!`);
  app.listen(PORT,()=> console.log(`server is running on ${PORT}`))
})

module.exports = app;
