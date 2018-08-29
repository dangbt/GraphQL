
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    name: { type: String },
    gerne: { type: String },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
});

module.exports = mongoose.model('Book', bookSchema);