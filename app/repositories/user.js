var mongoose = require( 'mongoose' );
var User = require( '../models/user.js' );
var _ = require( 'lodash' );

/**
 * This method is used to register new user with the given params
 *
 * @param {Object} userParams - You can take the schema of this object from the User model
 * @returns {Promise}
 */
module.exports.create = function( userParams ) {
  var newUser = new User( userParams );
  return newUser.save();
};

/**
 * This method is used to find user by given email in the database
 *
 * @param {String} email - The email of the user we need to find
 * @returns {Promise}
 */
module.exports.findByEmail = function( email ) {
  return User.findOne( {email: email} );
};

/**
 * This method is used to find user by given id in the database
 *
 * @param {String} id - The id of the user we need to find
 * @returns {Promise}
 */
module.exports.findById = function( id ) {
  return User.findById( {_id: id} );
};

/**
 * This method is used to update user by given id and new data
 *
 * @param {String} id - The id of the user we need to update
 * @param {Object} userParams - You can take the schema of this object from the User model
 * @returns {Promise}
 */
module.exports.updateById = function( id, userParams ) {
  return User.findByIdAndUpdate( {_id: id}, userParams );
};

/**
 * This method is used to delete user by given id
 *
 * @param {String} id - The id of the user we need to delete
 * @returns {Promise}
 */
module.exports.deleteById = function( id ) {
  return User.findByIdAndRemove( {_id: id} );
};

/**
 * This method is used to get all the vehicles of the user with a given id
 *
 * @param {String} id - The id of the user whose vehicles we need
 * @param res - The response of the HTTP request
 */
module.exports.getAllVehicles = function( id, res ) {
  this.findById( id )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'User with the given id was not found'
    } );
  } ).then( function( user ) {
    console.log( user.vehicles );
    res.json( {
      success: true, vehicles: user.vehicles
    } );
  } );
};

/**
 * This method is used to add vehicle to the user with a given id
 *
 * @param {String} id - The id of the user to whom the vehicle will be added
 * @param {Vehicle Object} vehicleParams - The new vehicle which will be added
 * @param res - The response of the HTTP request
 */
module.exports.addVehicle = function( id, vehicleParams, res ) {
  this.findById( id )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( err );
  } ).then( function( user ) {
    user.vehicles.push( vehicleParams );
    user.save();
    res.json( user );
  } );
};

/**
 * This method is used to get vehicle by id of a given user
 *
 * @param {String} userId - The id of the user whose vehicle we need get
 * @param {String} vehicleId - The id of the vehicle we need to get
 * @param res - The response of the HTTP request
 */
module.exports.getVehicleById = function( userId, vehicleId, res ) {
  this.findById( userId )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( err );
  } ).then( function( user ) {
    res.json( _.find( user.vehicles, {id: vehicleId} ) );
  } );
};

/**
 * This method is used to delete vehicle by id of a given user
 *
 * @param {String} userId - The id of the user whose vehicle we need to delete
 * @param {String} vehicleId - The id of the vehicle we need to delete
 * @param res - The response of the HTTP request
 */
module.exports.deleteVehicleById = function( userId, vehicleId, res ) {
  this.findById( userId )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( err );
  } ).then( function( user ) {
    user.vehicles = _.remove( user.vehicles, function( vehicle ) {
      return vehicle._id != vehicleId;
    } );
    user.save();
    res.json( {
      success: true, message: 'Vehicle deleted successfully'
    } );
  } );
};

/**
 * This method is used to get all addresses of the user with a given id
 *
 * @param {String} id - The id of the user whose addresses we need
 * @param res - The response of the HTTP request
 */
module.exports.getAllAddresses = function( id, res ) {
  this.findById( id )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( err );
  } ).then( function( user ) {
    res.json( {
      success: true, addresses: user.addresses
    } );
  } );
};

/**
 * This method is used to add address to the user with a given id
 *
 * @param {String} id - The id of the user to whom the address will be added
 * @param {Address Object} addressParams - The new address which will be added
 * @param res - The response of the HTTP request
 */
module.exports.addAddress = function( id, addressParams, res ) {
  this.findById( id )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( err );
  } ).then( function( user ) {
    user.addresses.push( addressParams );
    user.save();
    res.json( {
      success: true, message: 'Address added successfully'
    } );
  } );
};

/**
 * This method is used to get address by id from the user with a given id
 *
 * @param {String} userId - The id of the user whose address we need
 * @param {String} addressId - The id of the address we need
 * @param res - The response of the HTTP request
 */
module.exports.getAddressById = function( userId, addressId, res ) {
  this.findById( userId )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( err );
  } ).then( function( user ) {
    res.json( _.find( user.addresses, {id: addressId} ) );
  } );
};

/**
 * This method is used to delete address by id of a given user
 *
 * @param {String} userId - The id of the user whose address we need to delete
 * @param {String} addressId - The id of the address which will be deleted
 * @param res - The response of the HTTP request
 */
module.exports.deleteAddressById = function( userId, addressId, res ) {
  this.findById( userId )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( err );
  } ).then( function( user ) {

    console.log( user.addresses );
    user.addresses = _.remove( user.addresses, function( address ) {
      return address._id != addressId;
    } );
    console.log( user.addresses );
    user.save();
    res.json( {
      success: true, message: 'Address deleted successfully'
    } );
  } );
};

/**
 * This method is used to get all users
 *
 * @param res - The response of the HTTP request
 */
module.exports.getAll = function( res ) {
  User.find( function( err, users ) {
    res.json( users );
  } );
};

/**
 * This method is used to add new route to the given user
 *
 * @param {String} userId - The id of the user to whom the route will be added
 * @param {String} routeId - The id of the new route
 * @param res - The response of the HTTP request
 */
module.exports.addRoute = function( userId, routeId, res ) {
  this.findById( userId )
    .then( function( product ) {
      product.routes.push( routeId );
      product.save();
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'User not found', error: err
    } );
  } );
};

/**
 * This method is used to remove route by id from the given user
 *
 * @param {String} userId - The id of the user from whom the route will be removed
 * @param {String} routeId - The id of the route which will be removed
 * @param res - The response of the HTTP request
 */
module.exports.deleteRoute = function( userId, routeId, res ) {
  this.findById( userId )
    .then( function( product ) {
      product.routes = _.remove( product.routes, function( route ) {
        return route != routeId;
      } );
      product.save();
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'User not found', error: err
    } );
  } );
};