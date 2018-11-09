/*'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../controllers/AuthController.js');

router.get('/', auth.home);

router.get('/signin', auth.register);

router.post('/signin', auth.doRegister);

router.get('/login', auth.login);

router.post('/login', auth.doLogin);

router.get('/logout', auth.logout);

module.exports = router;
*/

var express = require('express');
var router = express.Router();

//GET My Folders 
router.get('/', function (req, res, next) {
    res.render('myFolders', { title: 'My Folders' });
});

module.exports = router;
