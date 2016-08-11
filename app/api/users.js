var bodyParser = require( 'body-parser' );
var userRepository = require( '../repositories/user.js' );
var userService = require( '../services/user.js' );
var authService = require( '../services/auth.js' );
var vehiclesApi = require( './users/vehicles.js' );
var addressesApi = require( './users/addresses.js' );
var groupsApi = require( './users/groups.js' );

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
    userRepository.create( userParams )
      .then( function( product ) {
        var tokenObject = userService.authenticateUser( product, product.password );
        res.json( {
          success: true,
          message: 'User registered successfully',
          user:    product,
          token:   tokenObject.token
        } );
      } ).catch( function( err ) {
      res.send( 400 ).json( err );
    } );
  } );

  // When a user needs to be authenticated and needs to receive a json web token
  app.post( '/api/users/authentication', function( req, res ) {
    var userEmail = req.body.email;
    var userPassword = req.body.password;

    if ( !userEmail || !userPassword ) res.status( 400 ).json( {
      success: false, message: 'Email or password is empty'
    } );

    // Find user by the given email and authenticate him
    userRepository.findByEmail( userEmail )
      .then( function( product ) {
        if ( !product ) res.status( 400 ).json( {
          success: false, message: 'No user found'
        } );
        return product;
      } ). catch( function( err ) {
      res.status( 400 ).json( err );
    } ).then( function( user ) {
      res.json( userService.authenticateUser( user, userPassword ) );
    } );
  } );

  // Stop users who aren't authenticated and verifies their tokens
  app.use( function( req, res, next ) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    authService.verifyToken( token, res, next );
  } );

  // Find user by given id
  app.get( '/api/users/:id', function( req, res ) {
    var userId = req.params.id;

    userRepository.findById( userId )
      .then( function( product ) {
        res.json( product );
      } ).catch( function( err ) {
      res.json( err );
    } );
  } );

  // Update user by given id
  app.put( '/api/users/:id', function( req, res ) {
    var userId = req.params.id;
    var userParams = req.body.newData;

    userRepository.updateById( userId, userParams )
      .then( function( product ) {
        res.json( product );
      } ).catch( function( err ) {
      res.json( err );
    } );
  } );

  // VehiclesApi will execute all methods connected with the vehicles of a given user
  vehiclesApi( app );

  // AddressesApi will execute all methods connected with the addresses of a given user
  addressesApi( app );

  // Get all users from the database
  app.get( '/api/users', function( req, res ) {
    userRepository.getAll( res );
  } );

  // Groups api will execute all methods connected with the groups of a given users
  groupsApi( app );
};