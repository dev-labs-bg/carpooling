var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );

/**
 * This method is used to register new user with the given params
 *
 * @param {Object} userParams - You can take the schema of this object from the User model
 * @returns {Promise}
 */
module.exports.createUser = function( userParams ) {
  var newUser = new User( userParams );
  return newUser.save();
};

/**
 * This method is used to find user by given email in the database
 *
 * @param {String} email - The email of the user we need to find
 * @returns {Promise}
 */
module.exports.findUserByEmail = function( email ) {
  return User.findOne( {email: email} );
};