const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
    name: String,
    houseID: Number,
    userIDs: [{userID: Number}],
    chores: [{
        name: String, 
        date: Date,
        userIndexes: [Number]
    }],
    balance: [[Number]]
});

export const House = mongoose.model('House', houseSchema)