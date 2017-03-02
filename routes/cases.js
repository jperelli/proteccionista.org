var express = require('express');
var db = require('../models');
var passport = require('passport');

var router = express.Router();

router.get('/', function(req, res, next) {
  db.Case.findAll({order: [['updated_at', 'DESC']]}).then(function(objs) {
    res.json(objs);
  }).catch(function(err){return res.status(500).json({message:err.message})});
});


router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  console.log(req.body)
  // animal, case, user, fbcase
  db.Case.sequelize.transaction({
    isolationLevel: 'SERIALIZABLE'
  }, function (t) {

    function createCase(req, animal_id, t) {
      return db.Case.create(Object.assign({}, req.body, {animal_id: animal_id}), {transaction: t}).then(function(c) {
        var issues = []
        for (var i in req.body.issues)
          if (req.body.issues[i])
            issues.push({case_id: c.id, type: i});
        return db.Issue.bulkCreate(issues, {transaction: t}).then(function() {
          return db.FbCase.create({id_facebook: req.body.fbcase.id_facebook, created_by_user_id: req.user.id, case_id:c.id}, {transaction: t}).then(function(fbcase){
            res.location(req.originalUrl + '/' + c.id);
            res.status(201).json(c);
          }).catch(function(err){console.error(err); res.status(500).json({name:err.name,message:err.message})});
        }).catch(function(err){console.error(err); res.status(500).json({name:err.name,message:err.message})});
      }).catch(function(err){console.error(err); res.status(500).json({name:err.name,message:err.message})});
    }

    // if animal incoming, add it.
    if (req.body.animal)
      return db.Animal.create(req.body.animal, {transaction:t}).then(function (animal) {
        return createCase(req, animal.id, t)
      }).catch(function(err){console.error(err); res.status(500).json({name:err.name,message:err.message})});
    else {
      if (req.body.animal_id)
        return createCase(req, animal_id, t)
      else
        return res.status(400).json({message: 'Expected animal or animal_id'})
    }

  }).catch(function(err) {console.error(err); res.json({name:err.name,message:err.message})});
});


module.exports = router
