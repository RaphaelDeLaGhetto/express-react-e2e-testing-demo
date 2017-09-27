'use strict';

const express = require('express');
//var passport = require('passport');
const router = express.Router();
const models = require('../models');

/**
 * POST /auth
 */
//router.post('/', passport.authenticate('local'), function(req, res) {
router.post('/auth', (req, res) => {

  res.status(401).json({ error: 'Unauthorized' });
});

module.exports = router;
