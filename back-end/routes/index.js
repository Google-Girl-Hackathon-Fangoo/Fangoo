var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/hello', function(req, res, next) {
	res.send('Hello World!');
});


router.get('/fanqie', function(req, res, next) {
	res.send('番茄是大蛋');
});



module.exports = router;
