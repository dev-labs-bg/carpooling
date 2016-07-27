var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// This is the vehicle schema
var vehicleSchema = new Schema( {
  brand:    {
    type: String, required: true
  }, model: {
    type: String, required: true
  }
} );

//This is the adress schema
var adressSchema = new Schema( {
  name:           {
    type: String, required: true
  }, coordinates: {
    type: Point, required: true
  }
} );

// This is the user schema
var userSchema = new Schema( {
  name:             {
    type: String, required: true
  }, mobile_number: {
    type: String, required: true
  }, vehicles:      [{
    type: vehicleSchema
  }], adresses:     [{
    type: adressSchema
  }], groups:       [{
    type: mongoose.Schema.objectId, ref: 'Groups'
  }]
} );

// Creates the user model in the database and put it in the module.exmports
var Users = mongoose.model( 'Users', userSchema );
module.exports = Users;