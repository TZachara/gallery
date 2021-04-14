const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    fileId: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Photo = mongoose.model('photo', PhotoSchema);
