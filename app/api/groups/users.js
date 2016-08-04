var groupRepository = require( '../../repositories/group.js' );

/**
 * This is the main part in the users api
 *
 * From here all methods connected with the users of a given group will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {
  
  // Get all users who are in the given group
  app.get( '/api/groups/:id/users', function( req, res ) {
    var id = req.params.id;

    groupRepository.getAllUsers( id, res );
  } );
};