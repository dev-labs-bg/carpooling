var userRepository = require( '../repositories/user.js' );

/**
 * This is the main part in the users collection
 *
 * From here all methods connected with more than one user will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Get all users from the database
  app.get( '/api/users', function( req, res ) {
    userRepository.getAllUsers( res );
  } );
};