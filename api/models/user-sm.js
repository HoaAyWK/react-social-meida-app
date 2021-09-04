const mongoose = require('mongoose');

const userSmSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true        
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverPicture: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    description: {
        type: String
    },
    city: {
        type: String       
    },
    country: {
        type: String      
    }    
}, { timestamps: true });

module.exports = mongoose.model('UserSm', userSmSchema);