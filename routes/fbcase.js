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
  return db.FbCase.findAll({
    where: {id_facebook:{$like: req.query.id_group+'_%',}},
    include: [{model: db.User, as: 'created_by_user', attributes: ['name', 'fb_id']}]
  }).then(function(objs) {
    if (objs === null) return res.json([])
    return res.json(objs);
  }).catch(function(err){console.error(err); return res.status(500).json({name:err.name,message:err.message})});
});

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var fbcase = {
    id_facebook: req.body.id_facebook,
    case_id: req.body.case_id ? req.body.case_id : null,
    created_by_user_id: req.user.id
  }
  return db.FbCase.create(fbcase).then(function(obj) {
    res.location(req.originalUrl + '/' + obj.id);
    return res.status(201).json(obj);
  }).catch(function(err){console.error(err); return res.status(500).json({name:err.name,message:err.message})});
});

module.exports = router;
