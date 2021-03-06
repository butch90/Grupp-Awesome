module.exports = function(mongoose){

  // our mongoose schema
  var workersSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    worktime: {type: Number, required: false},
    age: {type: Number, required: false},
    path: {type: String, required: false},
    email: {type: String, required: false},
    phone: {type: String, required: false}
    
    // a relation
    // doneBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  // Return
  return mongoose.model("workers", workersSchema);
};