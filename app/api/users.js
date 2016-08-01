var bodyParser = require( 'body-parser' );
var userRepository = require( '../repositories/user.js' );

/**
 *  This is the main part in the user api
 *
 *  From here all methods connected with users will be executed
 *
 * @param {Server Object} app
 */
module.exports = function( app ) {
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( {extended: true} ) );

  // When a new user needs to be registered
  app.post( '/api/users', function( req, res ) {

    // Create user by the passed request's parameters.
    var userParams = req.body;
    userRepository.createUser( userParams )
      .then( function( product ) {
        res.json( product );
      } ).catch( function( err ) {
      res.json( err );
    } );
  } );
};