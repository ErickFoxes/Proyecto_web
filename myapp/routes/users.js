'use strict';

var express = require('express');
var router = express.Router();
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const User = require("../models/user");


router.get('/signin', UserController.create);
router.post('/signin', UserController.store);
router.get('/login', UserController.login);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.use(AuthMiddleware.isAuthentication);
router.get('/myFolders', UserController.myFolders);
router.get('/settings', UserController.settings);
router.get('/history', UserController.history);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;