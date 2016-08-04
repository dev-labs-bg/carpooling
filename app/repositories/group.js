var mongoose = require( 'mongoose' );
var Group = require( '../models/group.js' );
var _ = require( 'lodash' );

/**
 * This method is used to create new group with the given params
 *
 * @param {Object} groupParams - You can take the schema of this object from Group model
 * @param res - The respond of the HTTP request
 */
module.exports.createGroup = function( groupParams, res ) {
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
module.exports.getGroupById = function( id ) {
  return Group.findById( {_id: id} );
};

/**
 * This method is used to update group by id
 *
 * @param {String} id - The id of the group which will be updated
 * @param {Object} groupParams - You can take the schema of this object from Group model
 * @param res - The response of the HTTP request
 */
module.exports.updateGroupById = function( id, groupParams, res ) {
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
module.exports.deleteGroupById = function( id, res ) {
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
