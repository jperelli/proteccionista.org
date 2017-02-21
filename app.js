var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var passport = require('passport');

var index = require('./routes/index');
var profile = require('./routes/profile');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('json spaces', 2);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// workaround when browser does not send Origin header.
// Read this https://github.com/expressjs/cors/issues/71
app.use(function(req,res,next){ req.headers.origin = req.headers.origin || req.headers.host; next(); })

// TODO: move this whitelist to config
var whitelist = ['http://localhost:8081', 'https://proteccionista.org']
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(originIsWhitelisted ? null : 'Blocked by CORS', originIsWhitelisted)
  }
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
jwtOptions.secretOrKey = config.jwtSecret;
//jwtOptions.issuer = 'proteccionista.org';
//jwtOptions.audience = 'proteccionista.org';
passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  db.User.findOne({ where: {id: jwt_payload.uid} }).then(function(user) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
      // or you could create a new account
    }
  }).catch(function(err) {
    console.log(err)
    return done(err, false);
  });
}));

var db = require('./models')
var router_factory = require('./routes/sequelize_express_rest_router')
app.use('/v1/', index);
app.use('/v1/profile', profile);
app.use('/v1/animals', router_factory(db.Animal));
app.use('/v1/cases', router_factory(db.Case));
app.use('/v1/issues', router_factory(db.Issue));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({status:500, message:err.message});
});

module.exports = app;
