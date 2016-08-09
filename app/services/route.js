var routeRepository = require( '../repositories/route.js' );
var userRepository = require( '../repositories/user.js' );
var groupRepository = require( '../repositories/group.js' );

/**
 * This method is used to delete route by given id from each collection
 *
 * @param {String} id - The id of the route which will be deleted
 * @param res - The response of the HTTP request
 */
module.exports.deleteById = function( id, res ) {
  routeRepository.findById( id )
    .then( function( product ) {
      var driverId = product.driver_id;
      var groupId = product.group_id;

      userRepository.deleteRoute( driverId, id, res );
      groupRepository.deleteRoute( groupId, id, res );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Route not found', error: err
    } );
  } );

  routeRepository.deleteById( id, res );
};