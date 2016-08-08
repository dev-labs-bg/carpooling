var jwt = require( 'jsonwebtoken' );
var config = require( '../../config/config.js' );
var userRepository = require( '../repositories/user.js' );

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
