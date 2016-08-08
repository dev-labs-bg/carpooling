var userRepository = require( '../../repositories/user.js' );

/**
 * This is the main part in the vehicles api
 *
 * From here all methods connected with the vehicles of a given user will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Get all vehicles of the user with a given id
  app.get( '/api/users/:userId/vehicles', function( req, res ) {
    var userId = req.params.userId;

    userRepository.getAllVehicles( userId, res );
  } );

  // Add new vehicle to the user with a given id
  app.post( '/api/users/:userId/vehicles', function( req, res ) {
    var userId = req.params.userId;
    var vehicleParams = req.body.vehicleParams;

    userRepository.addVehicle( userId, vehicleParams, res );
  } );

  // Get vehicle by id of the user with a given id
  app.get( '/api/users/:userId/vehicles/:vehicleId', function( req, res ) {
    var userId = req.params.userId;
    var vehicleId = req.params.vehicleId;

    userRepository.getVehicleById( userId, vehicleId, res );
  } );

  // Delete vehicle by id of the user with a given id
  app.delete( '/api/users/:userId/vehicles/:vehicleId', function( req, res ) {
    var userId = req.params.userId;
    var vehicleId = req.params.vehicleId;

    userRepository.deleteVehicleById( userId, vehicleId, res );
  } );
};