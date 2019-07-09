const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        required: true
    },
    nicknames: [{
        username: String,
        nickname: String,
        color: String,
    }],
    pending: {
        type: [String],
    },
    chores: [{ 
        name: {
            type: String,
            required: true,
            unique: true
        }, 
        start: Date, 
        interval: Number, 
        userIndex: [Number] 
    }]
});

module.exports = House = mongoose.model('houses', houseSchema)