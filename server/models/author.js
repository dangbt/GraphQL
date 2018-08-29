
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: { type: String },
    age: { type: Number }
});

module.exports = mongoose.model('Author', authorSchema);