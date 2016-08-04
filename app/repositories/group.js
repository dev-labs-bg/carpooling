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

