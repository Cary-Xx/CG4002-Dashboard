const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Database schema for input emg sensor reading
 */
const emgSchema = new Schema({
    dancer: { type: String, required: true },
    emg1: { type: Number, required: true },
    emg2: { type: Number, required: true },
    emg3: { type: Number, required: true },
    emg4: { type: Number, required: true },
    emg5: { type: Number, required: true }
}, {
    timestamps: true,
});

const EmgReading = mongoose.model('EmgReading', emgSchema, 'emgs');

module.exports = EmgReading;
