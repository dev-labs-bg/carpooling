var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// The vehicle schema is used in the user schema
var vehicleSchema = new Schema( {
  brand:    {
    type: String, required: true
  }, model: {
    type: String, required: true
  }
} );

//The address schema is used in the user schema
var addressSchema = new Schema( {
  name:           {
    type: String, required: true
  }, coordinates: {
    longitude: {type: Number, required: true}, latitude: {type: Number, required: true}
  }
} );

// The user schema is used to create the user model
var userSchema = new Schema( {
  email:            {
    type: String, required: true
  }, password:      {
    type: String, required: true
  }, name:          {
    type: String, required: true
  }, mobile_number: {
    type: String, required: true
  }, vehicles:      [vehicleSchema], addresses: [addressSchema], groups: [{
    type: mongoose.Schema.ObjectId, ref: 'Groups'
  }], routes:       [{
    type: mongoose.Schema.ObjectId, ref: 'Routes'
  }]
} );

// Creates the user model in the database and put it in the module.exmports
var Users = mongoose.model( 'Users', userSchema );
module.exports = Users;