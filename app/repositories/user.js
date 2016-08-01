var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );

/**
 * The create user method
 *
 * @param {Object} userParams - You can take the schema of this object from the User model
 * @returns {Promise}
 */
module.exports.createUser = function( userParams ) {
  var newUser = new User( userParams );
  return newUser.save();
};