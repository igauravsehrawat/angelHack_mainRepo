var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  eventTag: String,
  imageUrl: String,
  note: String
});


module.exports = mongoose.model('Event', EventSchema);

