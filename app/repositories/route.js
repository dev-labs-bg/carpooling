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
      success: false, message: 'Route creation failed', error: err
    } );
  } );
};

/**
 * This method is used to find route by id
 *
 * @param {String} id - The id of the route which is needed
 * @returns {Promise}
 */
module.exports.findById = function( id ) {
  return Route.findById( {_id: id} );
};

/**
 * This method is used to update given route with given params
 *
 * @param {String} id - The id of the route which will be updated
 * @param {Object} routeParams - You can take the schema of this object from the Route model
 * @param res - The response of the HTTP request
 */
module.exports.updateById = function( id, routeParams, res ) {
  Route.findByIdAndUpdate( {_id: id}, routeParams )
    .then( function( product ) {
      res.json( {
        success: true, message: 'Route updated successfully', route: product
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Route failed to update', error: err
    } );
  } );
};