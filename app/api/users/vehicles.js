var bodyParser = require( 'body-parser' );
var userRepository = require( '../../repositories/user.js' );
var userService = require( '../../services/user.js' );

/**
 * This is the main part in the vehicles api
 *
 * From here all methods connected with the vehicles of a given user will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Get all vehicles of the user with the given id
  app.get( '/api/users/:userId/vehicles', function( req, res ) {
    var userId = req.params.userId;

    userRepository.getAllVehicles( userId, res );
  } );

  // Add new vehicle to the user with the given id
  app.post( '/api/users/:userId/vehicles', function( req, res ) {
    var userId = req.params.userId;
    var vehicleParams = req.body.vehicleParams;

    userRepository.addVehicle( userId, vehicleParams, res );
  } );
};