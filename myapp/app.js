'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var localStrategy = require('passport-local').Strategy;
var user = require('./models/user');
//var menu = require('./models/Menu');
var flash = require('flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var driveRouter = require('./routes/myFolders');
//var fileRouter = require('./routes/folder');
var loginRouter = require('./routes/login');
var signinRouter = require('./routes/signin');
var settingsRouter = require('./routes/settings');
var historyRouter = require('./routes/history');

//var app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/myapp', {
    useNewUrlParser: true
})
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/*
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'granny playing smash bros flying on a shark',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'granny playing smash bros flying on a shark', // Change for security
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  name: 'sessionid',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/myFolders', driveRouter);
//app.use('/folder', fileRouter);
app.use('/login', loginRouter);
app.use('/signin', signinRouter);
app.use('/settings', settingsRouter);
app.use('/history', historyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
