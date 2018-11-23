const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const AuthMiddleware = {};

AuthMiddleware.isAuthentication = function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    data = JSON.parse(req.session.user);
    User.findOne({ username: data.username })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    return res.redirect('/');
                } else {
                    bcrypt.compare(data.userId, user._id.toString(), function (err, result) {
                        //console.log("llego aca", data.userId);
                        if (result == true) {
                            return next();
                        } else {
                            return next(err);
                        }
                    });
                }
            }
        });
};

module.exports = AuthMiddleware;