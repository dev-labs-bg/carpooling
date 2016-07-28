var bodyParser = require( 'body-parser' );
var userRepository = require( '../repositories/user.js' );

module.exports = function( app ) {
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( {extended: true} ) );

  app.post( '/api/users', function( req, res ) {
    var userParams = req.body;
    userRepository.createUser( userParams )
      .then( function( product ) {
        res.json( product );
      } ).catch( function( err ) {
      console.log( 'inside' );
      res.json( err );
    } );
  } );
};