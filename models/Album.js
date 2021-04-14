const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photos: [
        {
            photo: { type: mongoose.Schema.Types.ObjectId, ref: 'photo' },
        },
    ],
    createDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Album = mongoose.model('album', AlbumSchema);
