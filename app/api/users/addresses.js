var userRepository = require( '../../repositories/user.js' );

/**
 * This is the main part in the addresses api
 *
 * From here all methods connected with the addresses of a given user will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Get all address of the user with a given id
  app.get( '/api/users/:id/addresses', function( req, res ) {
    var userId = req.params.id;

    userRepository.getAllAddresses( userId, res );
  } );
};