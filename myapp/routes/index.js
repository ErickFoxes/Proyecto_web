/*var express = require('express');
var router = express.Router();

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'REPOT' });
});

module.exports = router;
*/

'use strict';

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
