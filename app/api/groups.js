var bodyParser = require( 'body-parser' );
var authService = require( '../services/auth.js' );
var groupRepository = require( '../repositories/group.js' );
var groupService = require( '../services/group.js' );

/**
 * This is the main part of the groups api
 *
 * From here all methods connected with groups will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( {extended: true} ) );

  // Stop users who aren't authenticated and verifies their tokens
  app.use( function( req, res, next ) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    authService.verifyToken( token, res, next );
  } );

  // When a new group needs to be created
  app.post( '/api/groups', function( req, res ) {
    var groupParams = req.body.groupParams;

    groupRepository.createGroup( groupParams, res );
  } );

  // Find group by given id
  app.get( '/api/groups/:id', function( req, res ) {
    var id = req.params.id;

    groupRepository.getGroupById( id )
      .then( function( product ) {
        res.json( {
          success: true, message: 'Group was found', group: product
        } );
      } ).catch( function( err ) {
      res.json( {
        success: false, message: 'Group was not found', error: err
      } );
    } );
  } );

  // Update group by given id
  app.put( '/api/groups/:id', function( req, res ) {
    var id = req.params.id;
    var groupParams = req.body.groupParams;

    groupRepository.updateGroupById ( id, groupParams, res );
  } );

  // Delete group by id with all of its connections with the users and the routes
  app.delete( '/api/groups/:id', function( req, res ) {
    var id = req.params.id;

    groupService.deleteGroupById( id, res );
  } );

  // Get all users who are in the given group
  app.get( '/api/groups/:id/users', function( req, res ) {
    var id = req.params.id;

    groupRepository.getAllUsers( id, res );
  } );
};