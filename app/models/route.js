var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// The address schema is used in the passenger schema and in the route schema
var addressSchema = new Schema( {
  coordinates: {
    type: Point, required: true
  }
} );

// The passenger schema is used in the route schema
var passengerSchema = new Schema( {
  user_id:   {
    type: mongoose.Schema.objectId, ref: "Users", required: true
  }, address: {
    type: addressSchema, required: true
  }
} );

// The route schema is used to create the route model
var routeSchema = new Schema( {
  group_id:        {
    type: mongoose.Schema.ObjectId, ref: "Groups", requred: true
  }, start_address: {
    type: addressSchema, required: true
  }, end_address:   {
    type: addressSchema, requred: true
  }, start_time:   {
    type: Date, requred: true
  }, driver_id:    {
    type: mongoose.Schema.ObjectId, ref: "Users", required: true
  }, passengers:   [{
    type: passengerSchema, required: true
  }]
} );

// Creates the route model in the database and put it in the module.exmports
var Routes = mongoose.model('Routes', routeSchema);
module.exports = Routes;