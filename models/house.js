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
    chores: [{ 
        name: {
            type: String,
            required: true,
            unique: true
        }, 
        start: Number, 
        interval: Number, 
        userIndex: [Number] 
    }]
});

module.exports = House = mongoose.model('houses', houseSchema)