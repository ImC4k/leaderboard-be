const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId; // used for foreign keys

var scoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    }
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;