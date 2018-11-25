'use strict';

const mongoose = require('mongoose');
const User = require("../models/user");
const UserController = {};
const bcrypt = require('bcrypt');
const fs = require('fs');

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

UserController.login = function (req, res, next) {
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
    User.findByIdAndUpdate(req.params.id, update, function (err, old) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json({ ok: true, old, update });
        }
    });
};

UserController.delete = function (req, res, next) {
    if (req.session) {
        User.findByIdAndRemove(req.params.id /*5bf5d08677ec1b0bb76b68f4*/, function (err, eliminado) {
            if (err) {
                // next(err);/*
                res.status(500);
                res.json({ code: 500, err });
            } else {
                res.json({ ok: true, eliminado });
                //res.redirect('/');
            }
        });
    } else {

    }
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

UserController.upload = function (req, res) {
    res.render('upload', { title: 'Upload a file' });
};

UserController.Uploads = function (req, res) {
    console.log(req.files);
    var tmp_path = req.files.photo.path;
    // Ruta donde colocaremos las imagenes
    var target_path = '../public/img/' + req.files.photo.name;
    // Comprobamos que el fichero es de tipo imagen
    if (req.files.photo.type.indexOf('image') == -1) {
        res.send('El fichero que deseas subir no es una imagen');
    } else {
        // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
            // Eliminamos el fichero temporal
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.render('upload', { message: '/img/' + req.files.photo.name, title: 'Upload a  file' });
            });
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