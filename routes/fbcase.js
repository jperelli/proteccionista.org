var express = require('express');
var router = express.Router();
var jsonwebtoken = require('jsonwebtoken');
var axios = require('axios');
var querystring = require('querystring');
var db = require('../models');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env];
var passport = require('passport');


router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  db.FbCase.findAll({where:{id_facebook:{$like: req.query.id_group+'_%',}}}).then(function(objs) {
    if (objs === null) return res.json([])
    res.json(objs);
  }).catch(function(err){console.error(err); return res.status(500).json({name:err.name,message:err.message})});
});

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  db.FbCase.create(req.body).then(function(obj) {
    res.location(req.originalUrl + '/' + obj.id);
    res.status(201).json(obj);
  }).catch(function(err){console.error(err); return res.status(500).json({name:err.name,message:err.message})});
});

module.exports = router;
