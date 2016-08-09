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

/**
 * This method is used to delete route by given id
 *
 * @param {String} id - The id of the route which will be deleted
 * @param res - The response of the HTTP request
 */
module.exports.deleteById = function( id, res ) {
  Route.findByIdAndRemove( {_id: id} )
    .then( function( product ) {
      res.json( {
        success: true, message: 'Route deleted successfully'
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Route failed to delete', error: err
    } );
  } );
};

/**
 * This method is used to add a passenger to the given route
 *
 * @param {String} routeId - The id of the route to which the passenger will be added
 * @param {Object} passengerParams - You can take the schema of this object in the route model
 * @param res - The response of the HTTP request
 */
module.exports.addPassenger = function( routeId, passengerParams, res ) {
  this.findById( routeId )
    .then( function( product ) {
      console.log( product.passengers );
      console.log( passengerParams );
      product.passengers.push( passengerParams );
      console.log( product );
      product.save();
      res.json( {
        success: true, message: 'Passenger added successfully', route: product
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Failed to add passenger', error: err
    } );
  } );
};

/**
 * This method is used to get all passengers of a given route
 *
 * @param {String} id - The id of the route whose passengers we need
 * @param res - The response of the HTTP request
 */
module.exports.getAllPassengers = function( id, res ) {
  this.findById( id )
    .then( function( product ) {
      res.json( {
        success: true, message: 'All passengers got successfully', passengers: product.passengers
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Failed to get all users', error: err
    } );
  } );
};

/**
 * This method is used to delete passenger by id
 *
 * @param {String} routeId - The id of the route whose passenger will be deleted
 * @param {String} passengerId - The id of the passenger which will be deleted
 * @param res - The response of the HTTP request
 */
module.exports.deletePassengerById = function( routeId, passengerId, res ) {
  this.findById( routeId )
    .then( function( product ) {
      product.passengers = _.remove( product.passengers, function( passenger ) {
        return passenger._id != passengerId;
      } );
      product.save();
      res.json( {
        success: true, message: 'Passenger delete successfully'
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Failed to delete passenger', error: err
    } );
  } );
};

/**
 * This method is used to get all routes
 *
 * @param res - The response of the HTTP request
 */
module.exports.getAll = function( res ) {
  Route.find( function( err, routes ) {
    if ( err ) res.json( {
      success: false, message: 'Failed to get all routes', error: err
    } );

    res.json( {
      success: true, message: 'All routes got successfully', routes: routes
    } );
  } );
};