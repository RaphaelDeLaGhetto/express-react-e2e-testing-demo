"use strict";

require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');

/**
 * Set static directory
 */
app.use(express.static('public'));

/**
 * Parse JSON
 */
app.use(bodyParser.json());

/**
 * Set up JWT middleware
 */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {
  jwtFromRequest: ExtractJwt.fromBodyField('token'),
  secretOrKey: process.env.SECRET_KEY
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  models.Agent.findOne({ id: jwt_payload.sub }, (err, agent) => {
    if (err) {
      return done(err, false);
    }
    if (agent) {
      return done(null, agent);
    }
    else {
      return done(null, false);
      // or you could create a new account 
    }
  });
}));

/**
 * Routes
 */
const agent = require('./routes/agent');

app.use('/agent', agent);

let port = process.env.NODE_ENV === 'production' ? 3000 : 3001;
app.listen(port, '0.0.0.0', () => {
  console.log('express-react-e2e-testing-demo listening on ' + port + '!');
});

module.exports = app;
