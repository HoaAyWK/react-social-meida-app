const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    description: { type: String, max: 500, defalt: '' },
    img: { type: String, default: '' },
    likes: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);