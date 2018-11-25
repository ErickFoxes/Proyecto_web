'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { mongodb } = require('./configs/keys');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');/*
var driveRouter = require('./routes/myFolders');
var fileRouter = require('./routes/folder');
var loginRouter = require('./routes/login');
var signinRouter = require('./routes/signin');
var settingsRouter = require('./routes/settings');
var historyRouter = require('./routes/history');
*/

var app = express();


require('./configs/database');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'granny playing smash bros flying on a shark',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: mongodb.URI,
    autoReconnect: true
  })
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  app.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
