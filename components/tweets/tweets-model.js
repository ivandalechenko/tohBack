const { Schema, model } = require('mongoose');

const tweetsSchema = new Schema({
    tweets: String,
    lastUpdate: Number,
});

module.exports = model('Tweets', tweetsSchema);