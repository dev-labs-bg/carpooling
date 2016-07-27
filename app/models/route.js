var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// This is the adress schema
var adressSchema = new Schema( {
  coordinates: {
    type: Point, required: true
  }
} );

// This is the passenger schema
var passengerSchema = new Schema( {
  user_id:   {
    type: mongoose.Schema.objectId, ref: "Users", required: true
  }, adress: {
    type: adressSchema, required: true
  }
} );

// This is the route schema
var routeSchema = new Schema( {
  group_id:        {
    type: mongoose.Schema.ObjectId, ref: "Groups", requred: true
  }, start_adress: {
    type: adressSchema, required: true
  }, end_adress:   {
    type: adressSchema, requred: true
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