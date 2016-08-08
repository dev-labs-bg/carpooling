var routeRepository = require( '../repositories/route.js' );

/**
 * This is the main part in the routes collection
 *
 * From here all methods connected with more than one route will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Get all routes
  app.get( '/api/routes', function( req, res ) {
    routeRepository.getAll( res );
  } );
};