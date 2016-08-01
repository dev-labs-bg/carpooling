var mongoose = require( 'mongoose' );
var jwt = require( 'jsonwebtoken' );
var User = require( '../models/user.js' );
var config = require( '../../config/config.js' );

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

/**
 * This method is used to authenticate user and return json web token
 *
 * @param {User} user - The user object which is found by the email
 * @param {String} userPassword - Password which must be checked for the authentication
 * @returns {Object}
 */
module.exports.authenticateUser = function( user, userPassword ) {
  if ( !user )
    return {
      success: false, message: 'User not found'
    };

  if ( user.password !== userPassword )
    return {
      success: false, message: 'Password does not match'
    };

  var token = jwt.sign( user, config.secret, {} );
  return {
    success: true, message: 'Token is ready', token: token
  };
};