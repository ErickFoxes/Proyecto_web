'use strict';

var express = require('express');
var router = express.Router();
const AuthController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const User = require("../models/user");


router.get('/signin', AuthController.create);
router.post('/signin', AuthController.store);
router.get('/login', AuthController.login);
router.post('/login', AuthController.signin);
router.get('/logout', AuthController.logout);
router.use(AuthMiddleware.isAuthentication);
router.get('/myFolders', AuthController.myFolders);

module.exports = router;