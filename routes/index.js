var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.signedCookies)
  console.log("jayho")
  res.render('index', {cookies:req.signedCookies });
});

module.exports = router;
