var express = require('express');
var router = express.Router();

/* GET Folder */
router.get('/', function (req, res, next) {
    res.render('folder', { title: 'Folder' });
});
//El nombre del folder cambiara segun el nombre que escoja el usuario... Aun no
module.exports = router;