var groupRepository = require( '../../repositories/route.js' );

/**
 * This is the main part in the routes api
 *
 * From here all methods connected with the routes of a given group will be executed
 *
 * @param {Express} app - Web Server
 */
module.exports = function( app ) {
  app.get( '/api/groups/:groupId/routes/', function( req, res ) {
    var groupId = req.params.groupId;

    groupRepository.getAllRoutes( groupId )
      .then( function( product ) {
        Promise.all( product )
          .then( function( routes ) {
            res.json( {
              success: true, message: 'All routes got successfully', routes: routes
            } );
          } ).catch( function( err ) {
          res.json( {
            success: false, message: 'Failed to get all routes', error: err
          } );
        } );
      } ).catch( function( err ) {
      res.json( {
        success: false, message: 'Failed to get all routes', error: err
      } );
    } );
  } );
};