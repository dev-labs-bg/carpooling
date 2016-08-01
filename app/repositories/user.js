var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );

/**
 * The create user method
 *
 * It is used by users api to register new user
 *
 * @param userParams
 * @returns {*}
 */
module.exports.createUser = function( userParams ) {

  // Create new user with the given params ans saves it to the database
  var newUser = new User( userParams );
  return newUser.save();
};