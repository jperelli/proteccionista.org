var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    code: 200,
    message: 'proteccionista.org API v1'
  });
});

module.exports = router;
