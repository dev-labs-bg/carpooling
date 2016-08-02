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

/**
 * This method is used to find user by given id in the database
 *
 * @param {String} id - The id of the user we need to find
 * @returns {Promise}
 */
module.exports.findUserById = function( id ) {
  return User.findById( {_id: id} );
};

/**
 * This method is used to update user by given id and new data
 *
 * @param {String} id - The id of the user we need to update
 * @param {Object} userParams - The new data which will be saved
 * @returns {Promise}
 */
module.exports.updateUserById = function( id, userParams ) {
  return User.findByIdAndUpdate({_id: id}, userParams);
};