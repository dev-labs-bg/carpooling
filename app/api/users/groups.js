var userRepository = require( '../../repositories/user.js' );
var userService = require( '../../services/user.js' );

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

  // Add the given user to the given group
  app.post( '/api/users/:userId/groups/:groupId', function( req, res ) {
    var userId = req.params.userId;
    var groupId = req.params.groupId;

    userService.addToGroup( userId, groupId, res );
  } );

  // Remove the given user from the given group
  app.delete( '/api/users/:userId/groups/:groupId', function( req, res ) {
    var userId = req.params.userId;
    var groupId = req.params.groupId;

    userService.removeFromGroup( userId, groupId, res );
  } );
};