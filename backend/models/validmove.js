const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Database schema for valid move
 */
const validmoveSchema = new Schema({
    position: {type: String, required: true},
    danceType: {type: String, required: true},
    syncDelay: {type: String, required: true}
}, {
    timestamps: true,
});

const Validmove = mongoose.model('Validmove', validmoveSchema, 'validmoves');

module.exports = Validmove;
