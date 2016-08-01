var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );

/**
 * The create user method
 *
 * It contains the main methods connected to one user, e.g. registration, login, authentication and
 * so on
 *
 * @param {Object} userParams - You can take the schema of this object from the user model
 * @returns {*}
 */
module.exports.createUser = function( userParams ) {

  // Create new user with the given params and saves it to the database
  var newUser = new User( userParams );
  return newUser.save();
};