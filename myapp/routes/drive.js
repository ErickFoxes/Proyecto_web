var express = require('express');
var router = express.Router();

/* GET Drive */
router.get('/', function (req, res, next) {
    res.render('drive', { title: 'MY FOLDERS' });
});

module.exports = router;
