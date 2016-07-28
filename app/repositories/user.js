var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );

module.exports.createUser = function( userParams ) {
  var newUser = new User( userParams );
  return newUser.save();
};