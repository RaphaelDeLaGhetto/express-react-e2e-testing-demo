'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.Agent = {
  dan: {
    _id: new ObjectId(),
    email: 'daniel@example.com',
    password: 'secret'
  },
  lanny: {
    _id: new ObjectId(),
    email: 'lanny@example.com',
    password: 'supersecret'
  }
};
