const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Database schema for input imu sensor reading
 */
const imuSchema = new Schema({
    dancer: {type: Number, required: true},
    wristAccX: {type: Number, required: true},
    wristAccY: {type: Number, required: true},
    wristAccZ: {type: Number, required: true},
    wristGyroX: {type: Number, required: true},
    wristGyroY: {type: Number, required: true},
    wristGyroZ: {type: Number, required: true}

    /**
     * Following attributes are not required for now
     */

    // ankleAccX: {type: Number, required: true},
    // ankleAccY: {type: Number, required: true},
    // ankleAccZ: {type: Number, required: true},
    // ankleGyroX: {type: Number, required: true},
    // ankleGyroY: {type: Number, required: true},
    // ankleGyroZ: {type: Number, required: true}
}, {
    timestamps: true,
});

const ImuReading = mongoose.model('ImuReading', imuSchema, 'imus');

module.exports = ImuReading;
