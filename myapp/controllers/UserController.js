'use strict';

const mongoose = require('mongoose');
const User = require("../models/user");
const AuthController = {};
const bcrypt = require('bcrypt');

AuthController.login = function (req, res, next) {
    res.render('login');
}

AuthController.create = function (req, res, next) {
    res.render('signin');
}

AuthController.store = async function (req, res) {
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

AuthController.myFolders = function (req, res) {
    return res.render('myFolders');
}

AuthController.settings = function (req, res) {
    return res.render('settings');
}

AuthController.history = function (req, res) {
    return res.render('history');
}

AuthController.signin = function (req, res, next) {
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

AuthController.delete = function (req, res, next) {
    //var data = {};
    if (req.body._id) {
        User.authenticate(req.body.username, req.body.password, (error, user) => {
            if (error || !user) {
                //res.render('delete', { err: error, username: req.body.username });
                console.log('la regaste we!');
            }
            else {
                User.findByIdAndRemove(user._id.toString(), function (err, user) {
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
                        res.redirect('/');
                    }
                })
                /*data.userId = user._id.toString(),
                    data.username = user.username,
                    data.password = user.password,
                    bcrypt.hash(data.userId, 10, function (err, hash) {
                        if (err) {
                            next(err);
                        }
                        data.userId = hash;
                        req.session.user = JSON.stringify(data);
                        return res.redirect('/users/myFolders');
                    });*/
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

/*
AuthController.remove({ _id: req.body.id }, function (err) {
    if (!err) {
        message.type = 'The user has been deleted!';
        res.redirect('/');
    }
    else {
        message.type = 'error';
    }
});

AuthController.put = function (req, res) {
    if (req.params.id) {
        User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            Gender: req.body.Gender,
            birthday: req.body.birthday,
            country: req.body.country,
        }, function (err, updated) {
            if (err) {
                res.json({
                    status: 500,
                    success: false,
                    errs
                });
            } else {
                res.json({
                    status: 200,
                    success: true,
                    updated
                })
            }
        });
    }
};*/

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
};

module.exports = AuthController;