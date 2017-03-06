var express = require('express');
var db = require('../models');

var router = express.Router();

router.get('/', function(req, res, next) {
  db.Animal.findAll({order: [['updated_at', 'DESC']]}).then(function(objs) {
    res.json(objs);
  }).catch(function(err){return res.status(500).json({message:err.message})});
});

router.get('/searchTerms/', function(req, res, next) {
  var q = ''
  if (req.query.type)
    q = 'type'
  else if (req.query.color)
    q = 'color'
  else if (req.query.race)
    q = 'race'

  db.Animal.findAll({where: {[q]:{$like: '%'+req.query[q]+'%'}}, attributes: [q], group: [q]}).then(function(objs) {
    res.json(objs.map(x => x[q]));
  }).catch(function(err){return res.status(500).json({message:err.message})});
});


module.exports = router
