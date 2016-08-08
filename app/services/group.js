var groupRepository = require( '../repositories/group.js' );
var userRepository = require( '../repositories/user.js' );
var _ = require( 'lodash' );

/**
 * This method is used to delete whole group with all of its connections with the users and the
 * routes
 *
 * @param {String} id - The id of the group which will be deleted
 * @param res - The response of the HTTP request
 */
module.exports.deleteById = function( id, res ) {
  groupRepository.getById( id )
    .then( function( product ) {
      return product;
    } ).catch( function( err ) {
    res.json( {
      success: false, message: 'Group failed to delete', error: err
    } );
  } ).then( function( group ) {
    group.users.forEach( function( userId ) {
      userRepository.findUserById( userId )
        .then( function( product ) {
          return product;
        } ).catch( function( err ) {
        res.json( {
          success: false, message: 'Group failed to delete', error: err
        } );
      } ).then( function( user ) {
        user.groups = _.remove( user.groups, function( groupId ) {
          return groupId != id;
        } );
        user.save();
      } );
    } );

    //TODO delete every route of that group

    groupRepository.deleteById( id, res );
  } );
};