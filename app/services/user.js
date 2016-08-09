var jwt = require( 'jsonwebtoken' );
var config = require( '../../config/config.js' );
var userRepository = require( '../repositories/user.js' );
var groupRepository = require( '../repositories/group.js' );

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

/**
 * This method is used to add given user to a given group
 *
 * @param {String} userId - The id of the user who will be added
 * @param {String} groupId - The id of the group to which the user will be added
 * @param res - The response of the HTTP request
 */
module.exports.addToGroup = function( userId, groupId, res ) {
  var promiseArr = [groupRepository.addUser( groupId, userId, res ), userRepository.addToGroup( userId, groupId, res )];

  Promise.all( promiseArr )
    .then( function() {
      res.json( {
        success: true, message: 'User added successfully to the group'
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Failed to add user to the group', error: err
    } );
  } );
};

/**
 * This method is used to remove given user from a given group
 *
 * @param {String} userId - The id of the user who will be removed
 * @param {String} groupId - The id of the group from which the user will be removed
 * @param res - The response of the HTTP request
 */
module.exports.removeFromGroup = function( userId, groupId, res ) {
  var promiseArr = [groupRepository.removeUser( groupId, userId, res ), userRepository.removeFromGroup( userId, groupId, res )];

  Promise.all( promiseArr )
    .then( function() {
      res.json( {
        success: true, message: 'User removed successfully from the given group'
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Failed to remove the user from the group', error: err
    } );
  } );
};
