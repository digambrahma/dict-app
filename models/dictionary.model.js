const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dictSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    }
})

dictSchema.index({ name: 'text' });

module.exports =  mongoose.model('Dictionary', dictSchema);