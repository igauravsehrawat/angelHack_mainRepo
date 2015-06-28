var mongoose = require('mongoose');

var EventGifSchema = new mongoose.Schema({
    gifTag: String,
    gifImagesUrl: [String],
    note: String
});

module.exports = mongoose.model('EventGifSchema', EventGifSchema);
