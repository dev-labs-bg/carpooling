var userRepository = require( '../../repositories/user.js' );

/**
 *  This is the main part in the groups api
 *
 *  From here all methods connected with groups will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Get all groups of the given users
  app.get( '/api/users/:id/groups', function( req, res ) {
    var userId = req.params.id;

    userRepository.getAllGroups( userId, res );
  } );
};