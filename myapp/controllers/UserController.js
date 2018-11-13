'use strict';

const mongoose = require('mongoose');
const User = require("../models/user");
const AuthController = {};
const bcrypt = require('bcrypt');

AuthController.login = function (req, res, next) {
    res.render('signin');
}

AuthController.create = function (req, res, next) {
    res.render('login')
}

AuthController.store = async function (req, res) {
    let user = {
        username: req.body.username,
        givenname: req.body.givenname,
        lastname: req.body.givenname,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        country: req.body.country,
    }

    await User.create(user, (error, user) => {
        if (error)
            return res.render('login', { err: error, username: user.username });
        else {
            let data = {
                userId: user._id.toString(),
                username: user.username,
                givenname: user.givenname,
                lastname: user.givenname,
                password: user.password,
                email: user.email,
                gender: user.gender,
                age: user.age,
                country: user.country,
            }
            bcrypt.hash(data.userId, 10, function (err, hash) {
                if (err) {
                    next(err);
                }
                data.userId = hash;
                req.session.user = JSON.stringify(data);
                console.log(req.session.user);
                return res.redirect('/users/myFolders');
            });
        }
    })
};

AuthController.myFolders = function (req, res) {
    return res.render('myFolders');
}

AuthController.signin = function (req, res, next) {
    var data = {};
    User.authenticate(req.body.username, req.body.password, (error, user) => {
        if (error || !user) {
            res.render('signin', { err: error, username: req.body.username });
        }
        else {
            data.userId = user._id.toString(),
                data.username = user.username,
                data.password = user.password
            bcrypt.hash(data.userId, 10, function (err, hash) {
                if (err) {
                    next(err);
                }
                data.userId = hash;
                req.session.user = JSON.stringify(data);
                return res.redirect('/users/myFolders');
            });
        }
    });
};

AuthController.logout = function (req, res, next) {
    if (req.session) { 
        req.session.destroy(function (err) { 
            if (err) { 
                next(err);
            }
            else { 
                res.redirect('/');
            }
        });
    }
}

module.exports = AuthController;



















/*
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

*/