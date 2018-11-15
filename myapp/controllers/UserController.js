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
                lastname: user.lastname,
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
                return res.redirect('myFolders');
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
               /* data.givenname = user.givenname,
                data.lastname = user.lastname,*/
                data.password = user.password,
                /*data.email = user.email,
                data.gender = user.gender,
                data.age = user.age,
                data.country = user.country,*/
                bcrypt.hash(data.userId, 10, function (err, hash) {
                    if (err) {
                        next(err);
                    }
                    data.userId = hash;
                    req.session.user = JSON.stringify(data);
                    return res.redirect('/users/NO/myFolders');
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