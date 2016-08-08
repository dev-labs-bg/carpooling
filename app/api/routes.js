var bodyParser = require( 'body-parser' );
var routeRepository = require( '../repositories/route.js' );
var routeService = require( '../services/route.js' );

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

  // Get route by id
  app.get( '/api/routes/:id', function( req, res ) {
    var routeId = req.params.id;
    routeRepository.findById( routeId )
      .then( function( product ) {
        res.json( {
          success: true, message: 'Route found successfully', route: product
        } );
      } ).catch( function( err ) {
      res.json( {
        success: false, message: 'Route not found', error: err
      } );
    } );
  } );

  // Update route by id
  app.put( '/api/routes/:id', function( req, res ) {
    var routeId = req.params.id;
    var routeParams = req.body.routeParams;

    routeRepository.updateById( routeId, routeParams, res );
  } );

  // Delete route by id
  app.delete( '/api/routes/:id', function( req, res ) {
    var routeId = req.params.id;
    routeService.deleteById( routeId, res );
  } );

  // Add passenger to the given route
  app.post( '/api/routes/:id/passengers', function( req, res ) {
    var routeId = req.params.id;
    var passengerParams = req.body.passengerParams;

    routeRepository.addPassenger( routeId, passengerParams, res );
  } );
};