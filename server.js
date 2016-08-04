var mongoose = require( 'mongoose' );
var express = require( 'express' );
var usersApi = require( './app/api/users.js' );
var groupsApi = require( './app/api/groups.js' );
var config = require( './config/config.js' );
mongoose.Promise = global.Promise;

var db = mongoose.connect( config.db, function( err ) {
  if ( err ) {
    throw err;
  }
} );

var app = express( db );

usersApi( app );
groupsApi( app );

app.listen( 3000 );
