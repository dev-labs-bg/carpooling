var bodyParser = require( 'body-parser' );
var authService = require( '../services/auth.js' );
var groupRepository = require( '../repositories/group.js' );

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

};