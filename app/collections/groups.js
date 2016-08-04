var groupRepository = require( '../repositories/group.js' );

/**
 * This is the main part in the groups collection
 *
 * From here all methods connected with more than one group will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Get all groups from the database
  app.get( '/api/groups', function( req, res ) {
    groupRepository.getAllGroups( res );
  } )
};