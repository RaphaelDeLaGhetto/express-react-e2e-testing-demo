"use strict";

const express = require('express');
const app = express();
const models = require('./models');


// Set static directory
app.use(express.static('public'));

/**
 * Routes
 */
//const index = require('./routes/auth');


let port = process.env.NODE_ENV === 'production' ? 3000 : 3001;
app.listen(port, '0.0.0.0', () => {
  console.log('express-react-e2e-testing-demo listening on ' + port + '!');
});

module.exports = app;
