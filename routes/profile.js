var express = require('express');
var router = express.Router();
var jsonwebtoken = require('jsonwebtoken');
var axios = require('axios');
var querystring = require('querystring');
var db = require('../models');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env];
var passport = require('passport');
var sequelize = require('sequelize');


router.get('/jwt', function(req, res, next) {
  var fb_access_token = req.header('Authorization').split(' ')[1];
  axios.get(
    'https://graph.facebook.com/v2.8/me?access_token=' + fb_access_token
  ).then(function(response) {
    var fb_id = response.data.id;
    var userData = {
      fb_id: fb_id,
      name: response.data.name,
      fb_access_token: fb_access_token
    }
    db.User.findOrCreate({where:{fb_id:fb_id},defaults:userData}).spread(function (user, created) {
      if (created) {
        res.json({jwt: jsonwebtoken.sign({uid: user.id}, config.jwtSecret)});
      } else {
        return user.updateAttributes(userData).then(function (user) {
          res.json({jwt: jsonwebtoken.sign({uid: user.id}, config.jwtSecret)});
        });
      }
    })
    .catch(function(error) {
      res.status(500).json({message: error})
    })
  }).catch(function(error) {
    res.status(500).json({message: 'Cannot authenticate FB: ' + error})
  })
});


function mergeObject(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  res.json(req.user.get());
});

router.post('/groups/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  if ( req.user.fb_groups.indexOf(req.body.id) == -1) {
    return req.user.update(
      {
        fb_groups: sequelize.fn('array_append',  sequelize.col('fb_groups'), req.body.id )
      }, {returning: true}
    ).then(function(instance) {
      res.json(instance.fb_groups);
    }).catch(function(error) {
      res.status(500).json({message: error})
    })
  }
  res.json(req.user.fb_groups)
});

router.delete('/groups/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  if ( req.user.fb_groups.indexOf(req.params.id) != -1) {
    return req.user.update(
      {
        fb_groups: sequelize.fn('array_remove',  sequelize.col('fb_groups'), req.params.id )
      }, {returning: true}
    ).then(function(instance) {
      res.json(instance.fb_groups);
    }).catch(function(error) {
      res.status(500).json({message: error})
    })
  }
  res.json(req.user.fb_groups)
});

module.exports = router;
