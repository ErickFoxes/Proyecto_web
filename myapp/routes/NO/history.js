var express = require('express');
var router = express.Router();

/* GET history page. */
router.get('/', function(req, res, next) {
  res.render('history', { title: 'History' });
});

module.exports = router;
