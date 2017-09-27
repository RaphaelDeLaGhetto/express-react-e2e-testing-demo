'use strict';

const express = require('express');
//var passport = require('passport');
const router = express.Router();
const models = require('../models');
const jwt = require('jwt-simple');

/**
 * POST /auth
 */
//router.post('/', passport.authenticate('local'), function(req, res) {
router.post('/auth', (req, res) => {
  if (req.body.email && req.body.password) {
    models.Agent.findOne({ email: req.body.email }, (err, agent) => {
      if (agent) {
        agent.validPassword(req.body.password, (err, isMatch) => {
          if (err) {
            res.status(500).json({ error: err });
          }
          if (isMatch) {
            let payload = {
              id: agent.id
            };
            let token = jwt.encode(payload, process.env.SECRET_KEY);
            res.json({ token: token });
          }
          else {
            res.status(401).json({ error: 'Unauthorized' });
          }
        });
      }
      else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    });
  }
  else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;
