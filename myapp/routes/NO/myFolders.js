var express = require('express');
var router = express.Router();

/* GET My Folders */
router.get('/', function (req, res, next) {
    res.render('myFolders', { title: 'My Folders' });
});

module.exports = router;
