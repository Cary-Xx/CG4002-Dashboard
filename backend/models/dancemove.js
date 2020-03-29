const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Database schema for dancemove
 */
const dancemoveSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  dateCreated: { type: Date, required: true },
}, {
  timestamps: true,
});

const DanceMove = mongoose.model('DanceMove', dancemoveSchema);

module.exports = DanceMove;
