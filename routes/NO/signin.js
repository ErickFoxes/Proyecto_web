var express = require('express');
var router = express.Router();

/* GET Sign in */
router.get('/', function (req, res, next) {
    res.render('signin', { title: 'Join Us' });
});
module.exports = router;