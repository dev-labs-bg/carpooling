var userRepository = require( '../../repositories/user.js' );

/**
 * This is the main part in the addresses api
 *
 * From here all methods connected with the addresses of a given user will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {

  // Get all address of the user with a given id
  app.get( '/api/users/:id/addresses', function( req, res ) {
    var userId = req.params.id;

    userRepository.getAllAddresses( userId, res );
  } );

  // Add new address to the user with a given id
  app.post( '/api/users/:id/addresses', function( req, res ) {
    var userId = req.params.id;
    var addressParams = req.body.addressParams;

    userRepository.addAddress( userId, addressParams, res );
  } );

  // Get address by id from the user with a given id
  app.get( '/api/users/:userId/addresses/:addressId', function( req, res ) {
    var userId = req.params.userId;
    var addressId = req.params.addressId;

    userRepository.getAddressById( userId, addressId, res );
  } );
};