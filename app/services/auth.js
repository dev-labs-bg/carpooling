var jwt = require( 'jsonwebtoken' );
var config = require( '../../config/config.js' );

/**
 * Verifies given token
 *
 * @param {JSON web token} token - The token which should be verified
 * @returns {Object}
 */
module.exports.verifyToken = function( token, res, next ) {
  if ( !token ) {
    return res.status( 403 ).send( {
      success: false, message: 'No token provided'
    } );
  }

  jwt.verify( token, config.secret, function( err, decoded ) {
    if ( err )
      return res.json( {
        success: false, message: 'Failed to authenticate'
      } );

    res.decoded = decoded;
    next();
  } );
};