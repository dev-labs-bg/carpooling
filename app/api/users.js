var bodyParser = require( 'body-parser' );
var userRepository = require( '../repositories/user.js' );
var userService = require( '../services/user.js' );

/**
 *  This is the main part in the users api
 *
 *  From here all methods connected with users will be executed
 *
 * @param {Express} app - Web Server
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

  // When a user needs to be authenticated and needs to receive a json web token
  app.post( '/api/users/authentication', function( req, res ) {
    var userEmail = req.body.email;
    var userPassword = req.body.password;

    // Find user by the given email and authenticate him
    userRepository.findUserByEmail( userEmail )
      .then( function( product ) {
        return product;
      } ). catch( function( err ) {
      res.json( err );
    } ).then( function( user ) {
      res.json( userService.authenticateUser( user, userPassword ) );
    } );
  } );

  // Stop users who aren't authenticated and verifies their tokens
  app.use( function( req, res, next ) {
    var token = req.body.token || req.query.token || req.headers['x-acess-token'];
    userService.verifyToken( token, res, next );
  } );

  // Find user by given id
  app.get( '/api/users/:id', function( req, res ) {
    var userId = req.params.id;

    userRepository.findUserById( userId )
      .then( function( product ) {
        res.json( product );
      } ).catch( function( err ) {
      res.json( err );
    } );
  } );
};