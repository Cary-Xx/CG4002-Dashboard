const router = require('express').Router();
const Emg = require('../models/emgReading');

router.route('/').get((req, res) => {
    Emg.find()
        .then(emgs => res.json(emgs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const emg1 = Number(req.body.emg1);
    const emg2 = Number(req.body.emg2);
    const emg3 = Number(req.body.emg3);
    const emg4 = Number(req.body.emg4);
    const emg5 = Number(req.body.emg5);

    const newEmgReading = new Emg({
        emg1: emg1,
        emg2: emg2,
        emg3: emg3,
        emg4: emg4,
        emg5: emg5
    });

    newEmgReading.save()
        .then(() => res.json('Emg Sensor Reading Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Emg.findById(req.params.id)
        .then(emg => res.json(emg))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Emg.findByIdAndDelete(req.params.id)
        .then(() => res.json('Emg Sensor Reading deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
