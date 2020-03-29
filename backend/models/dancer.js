const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Database schema for dancer
 */
const dancerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2
  },
}, {
  timestamps: true,
});

const Dancer = mongoose.model('Dancer', dancerSchema);

module.exports = Dancer;
