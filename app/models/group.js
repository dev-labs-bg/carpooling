var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// This is the adress schema
var adressSchema = new Schema( {
  coordinates: {
    type: Point, required: true
  }
} );

//This is the group schema
var groupSchema = new Schema( {
  name:      {
    type: String, required: true
  }, adress: {
    type: adressSchema, required: true
  }
} );

// Creates the group model in the database and put it in the module.exmports
var Groups = mongoose.model( 'Groups', groupSchema );
module.exports = Groups;