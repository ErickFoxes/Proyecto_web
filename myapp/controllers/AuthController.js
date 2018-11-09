'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user');

var userController = {};

userController.home = function (req, res) {
    console.log(req.user);
    res.render('index', {
      user: req.user,
      title: 'DATA CLOUD'
    });
};

userController.register = function (req, res) {
    res.render('auth/signin');
};

userController.doRegister = function (req, res) {
    User.register(new User({
            username: req.body.username,
            name: req.body.name
        }), req.body.password, function (err, user) {
            if (err) {
                return res.render('auth/signin', {
                user: req.body.username
                });
            }   
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};
  
userController.login = function (req, res) {
    res.render('auth/login', {title: 'Log in'});
};

userController.doLogin = function (req, res) {
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, function () {
      res.redirect('/');
    });
};

userController.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
  
module.exports = userController;

