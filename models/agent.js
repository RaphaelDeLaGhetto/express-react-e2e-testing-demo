'use strict';

const bcrypt = require('bcrypt-nodejs');
//const findOrCreate = require('mongoose-findorcreate');

module.exports = function(mongoose) {
  const Schema = mongoose.Schema;
  const Types = Schema.Types;

  const AgentSchema = new Schema({
    email: {
      type: Types.String,
      trim: true,
      required: [true, 'No email supplied'],
      unique: [true, 'That email is taken'],
      empty: [false, 'No email supplied'],
    },
    password: {
      type: Types.String,
      trim: true,
      required: [true, 'No password supplied'],
      empty: [false, 'No password supplied'],
    },
  }, {
      timestamps: true
  });

  /**
   * Encrypt the password before saving
   */
  AgentSchema.pre('save', function(next) {
    let agent = this;

    // Only hash the password if it has been modified (or is new)
    if (!agent.isModified('password')) return next();

    // Generate a salt
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      // Hash the password using our new salt
      bcrypt.hash(agent.password, salt, null, function(err, hash) {
        if (err) return next(err);
        // Override the cleartext password with the hashed one
        agent.password = hash;
        next();
      });
    });
  });

  /**
   * Don't allow any duplicate emails
   */
  AgentSchema.path('email').validate(function(value, done) {
    this.model('Agent').count({ email: value }, (err, count) => {
      if (err) {
        return done(err);
      }
      // If `count` is greater than zero, "invalidate"
      done(!count, 'That email is taken');
    });
  });

  /**
   * Check to see if the supplied password is valid
   */
  AgentSchema.statics.validPassword = function(password, hash, done, agent) {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) console.log(err);
      if (isMatch) {
        return done(null, agent);
      } else {
        return done(null, false);
      }
    });
  };
  return AgentSchema;
};
