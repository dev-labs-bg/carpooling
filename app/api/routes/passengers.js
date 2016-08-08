var routeRepository = require( '../../repositories/route.js' );

/**
 *  This is the main part in the passengers api
 *
 *  From here all methods connected with passengers will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Add passenger to the given route
  app.post( '/api/routes/:id/passengers', function( req, res ) {
    var routeId = req.params.id;
    var passengerParams = req.body.passengerParams;

    routeRepository.addPassenger( routeId, passengerParams, res );
  } );

  // Get all passengers of a given route
  app.get( '/api/routes/:id/passengers', function( req, res ) {
    var routeId = req.params.id;

    routeRepository.getAllPassengers( routeId, res );
  } );

  // Delete passenger by id of the given route
  app.delete( '/api/routes/:routeId/passengers/:passengerId', function( req, res ) {
    var routeId = req.params.routeId;
    var passengerId = req.params.passengerId;

    routeRepository.deletePassengerById( routeId, passengerId, res );
  } )
};