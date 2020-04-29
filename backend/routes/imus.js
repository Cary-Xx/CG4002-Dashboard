const router = require('express').Router();
const Imu = require('../models/imuReading');

router.route('/').get((req, res) => {
    Imu.find()
        .then(imus => res.json(imus))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const wristAccX = Number(req.body.wristAccX);
    const wristAccY = Number(req.body.wristAccY);
    const wristAccZ = Number(req.body.wristAccZ);
    const wristGyroX = Number(req.body.wristGyroX);
    const wristGyroY = Number(req.body.wristGyroY);
    const wristGyroZ = Number(req.body.wristGyroZ);

    const newImuReading = new Imu({
        wristAccX: wristAccX,
        wristAccY: wristAccY,
        wristAccZ: wristAccZ,
        wristGyroX: wristGyroX,
        wristGyroY: wristGyroY,
        wristGyroZ: wristGyroZ,
    });

    newImuReading.save()
        .then(() => res.json('Imu Sensor Reading Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Imu.findById(req.params.id)
        .then(imu => res.json(imu))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Imu.findByIdAndDelete(req.params.id)
        .then(() => res.json('Imu Sensor Reading deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
