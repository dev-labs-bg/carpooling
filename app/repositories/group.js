var mongoose = require( 'mongoose' );
var Group = require( '../models/group.js' );
var _ = require( 'lodash' );
var userRepository = require( './user.js' );

/**
 * This method is used to create new group with the given params
 *
 * @param {Object} groupParams - You can take the schema of this object from Group model
 * @param res - The respond of the HTTP request
 */
module.exports.create = function( groupParams, res ) {
  var newGroup = new Group( groupParams );

  newGroup.save()
    .then( function( product ) {
      res.json( {
        success: true, message: 'Group created successfully', group: product
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Group creation failed', error: err
    } );
  } );
};

/**
 * This method is used to get group by id
 *
 * @param {String} id - The id of the group we need
 */
module.exports.getById = function( id ) {
  return Group.findById( {_id: id} );
};

/**
 * This method is used to update group by id
 *
 * @param {String} id - The id of the group which will be updated
 * @param {Object} groupParams - You can take the schema of this object from Group model
 * @param res - The response of the HTTP request
 */
module.exports.updateById = function( id, groupParams, res ) {
  Group.findByIdAndUpdate( {_id: id}, groupParams )
    .then( function( product ) {
      res.json( {
        success: true, message: 'Group updated successfully', group: product
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Group failed to update', error: err
    } );
  } );
};

/**
 * This method is used to delete group by id
 *
 * @param {String} id - The id of the group which will be deleted
 * @param res - The response of the HTTP request
 */
module.exports.deleteById = function( id, res ) {
  Group.findByIdAndRemove( {_id: id} )
    .then( function( product ) {
      res.json( {
        success: true, message: 'Group deleted successfully'
      } );
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Group failed to delete', error: err
    } );
  } );
};

/**
 * This method is used to get all users of a given group
 *
 * @param {String} id - The id of the group whose users we need
 * @param res - The response of the HTTP request
 */
module.exports.getAllUsers = function( id, res ) {
  this.getById( id )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Failed to get all users', error: err
    } );
  } ).then( function( group ) {
    var allUsersPromises = [], allUsers = [];
    group.users.forEach( function( userId ) {
      allUsersPromises.push( userRepository.findById( userId ) );
    } );

    Promise.all( allUsersPromises )
      .then( function( product ) {
        res.json( {
          success: true, message: 'Got all users successfully', users: product
        } );
      } ).catch( function( err ) {
      res.json( {
        success: false, message: 'Failed to get all users', error: err
      } );
    } );
  } );
};

/**
 * This method is used to get all groups from the database
 *
 * @param res - The response of the HTTP request
 */
module.exports.getAll = function( res ) {
  Group.find( function( err, groups ) {
    if ( err ) res.json( {
      success: false, message: 'Failed to get all groups', error: err
    } );

    res.json( {
      success: true, message: 'Got all groups successfully', groups: groups
    } );
  } );
};

/**
 * This method is used to add new route to the given group
 *
 * @param {String} groupId - The id of the group to which the new route will be added
 * @param {String}routeId - The id of the new route
 * @param res - The response of the HTTP request
 */
module.exports.addRoute = function( groupId, routeId, res ) {
  this.getById( groupId )
    .then( function( product ) {
      product.routes.push( routeId );
      product.save();
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Group not found', error: err
    } );
  } );
};

/**
 * This method is used to remove route by id from the given group
 *
 * @param {String} groupId - The id of the group from which the route will be removed
 * @param {String} routeId - The id of the route which will be removed
 * @param res - The response of the HTTP request
 */
module.exports.deleteRoute = function( groupId, routeId, res ) {
  this.getById( groupId )
    .then( function( product ) {
      product.routes = _.remove( product.routes, function( route ) {
        return route != routeId;
      } );
      product.save();
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Group not found', error: err
    } );
  } );
};
