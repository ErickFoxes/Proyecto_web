'use strict';

const mongoose = require('mongoose');
const User = require("../models/user");
const UserController = {};
const bcrypt = require('bcrypt');

UserController.login = function (req, res, next) {
    res.render('login');
}

UserController.create = function (req, res, next) {
    res.render('signin');
}

UserController.store = async function (req, res) {
    let user = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        Gender: req.body.Gender,
        birthday: req.body.birthday,
        country: req.body.country,
    }
    await User.create(user, (error, user) => {
        if (error)
            return res.render('signin', { err: error, username: user.username });
        else {
            let data = {
                userId: user._id.toString(),
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                password: user.password,
                email: user.email,
                Gender: user.Gender,
                birthday: user.birthday,
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

UserController.myFolders = function (req, res) {
    return res.render('myFolders');
}

UserController.settings = function (req, res) {
    return res.render('settings');
}

UserController.history = function (req, res) {
    return res.render('history');
}

UserController.signin = function (req, res, next) {
    var data = {};
    User.authenticate(req.body.username, req.body.password, (error, user) => {
        if (error || !user) {
            res.render('login', { err: error, username: req.body.username });
        }
        else {
            data.userId = user._id.toString(),
                data.username = user.username,
                data.password = user.password,
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

UserController.update = function (req, res) {
    let update = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        Gender: req.body.Gender,
        birthday: req.body.birthday,
        country: req.body.country,
    };
    postModel.findByIdAndUpdate(req.params.id, update, function (err, old) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json({ ok: true, old, update });
        }
    });
};

UserController.delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, eliminado) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json({ ok: true, eliminado });
            res.redirect('/');
        }
    });
};

UserController.logout = function (req, res, next) {
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
};

module.exports = UserController;
/**** Version antigua del controlador para actualizar.. ***********/
/*
UserController.update = function(req,res){
    if (req.params.id) {
        User.findByIdAndUpdate(req.params.id,{
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            Gender: req.body.Gender,
            birthday: req.body.birthday,
            country: req.body.country,
        },function(err,updated){
            if (err){
                res.json({
                    status: 500,
                    success: false,
                    errs
                });
            } else{
                res.json({
                    status: 200,
                    success: true,
                    updated
                })
            }
        });
    }
};
*/
/*************Version antigua del controlador delete ********************/
/* 
UserController.delete = function (req, res) {
    if (req.params.id) {
        User.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    success: false,
                    err
                });
            } else {
                res.json({
                    success: true,
                    delete: user
                });
            }
        });
    } else {

        res.status(400);
        res.json({
            status: 400,
            success: false
        });
    }
};

*/