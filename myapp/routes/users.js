'use strict';

var express = require('express');
var router = express.Router();
const AuthController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const User = require("../models/user");


router.get('/login', AuthController.create);
router.post('/login', AuthController.store);
router.get('/signin', AuthController.login);
router.post('/signin', AuthController.signin);
router.get('/logout', AuthController.logout);
router.use(AuthMiddleware.isAuthentication);
router.get('/myFolders', AuthController.myFolders);

module.exports = router;