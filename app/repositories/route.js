var mongoose = require( 'mongoose' );
var Route = require( '../models/route.js' );
var groupRepository = require( './group.js' );
var userRepository = require( './user.js' );
var _ = require( 'lodash' );

/**
 * This method is used to create new route with the given params
 *
 * @param {Object} routeParams - You can take the schema of this object from the Route model
 * @param res - The response of the HTTP request
 */
module.exports.create = function( routeParams, res ) {
  var newRoute = new Route( routeParams );

  newRoute.save()
    .then( function( product ) {
      var routeId = product._id;
      var groupId = product.group_id;
      groupRepository.addRoute( groupId, routeId, res );

      var driverId = product.driver_id;
      userRepository.addRoute( driverId, routeId, res );

      res.json( {
        success: true, message: 'Route created successfully', route: product
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'User creation failed', error: err
    } );
  } );
};