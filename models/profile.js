const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    username: String,
    coins: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Profile', profileSchema);