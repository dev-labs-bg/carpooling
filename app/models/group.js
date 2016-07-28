var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// The address schema is used in the group schema
var addressSchema = new Schema( {
  coordinates: {
    type: Point, required: true
  }
} );

// The group schema is used to create the group model
var groupSchema = new Schema( {
  name:       {
    type: String, required: true
  }, address: {
    type: addressSchema, required: true
  }
} );

// Creates the group model in the database and put it in the module.exports
var Groups = mongoose.model( 'Groups', groupSchema );
module.exports = Groups;