var bodyParser = require( 'body-parser' );
var routeRepository = require( '../repositories/route.js' );

/**
 *  This is the main part in the routes api
 *
 *  From here all methods connected with routes will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( {extended: true} ) );

  // When a new route needs to be created
  app.post( '/api/routes', function( req, res ) {
    var routeParams = req.body.routeParams;
    routeRepository.create( routeParams, res );
  } );
};