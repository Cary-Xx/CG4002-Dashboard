const router = require('express').Router();
const Validmove = require('../models/validmove');

router.route('/').get((req, res) => {
    Validmove.find()
        .then(validmoves => res.json(validmoves))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const position = req.body.position;
    const danceType = req.body.danceType;
    const syncDelay = req.body.syncDelay;

    const newValidmove = new Validmove({
        position,
        danceType,
        syncDelay,
    });

    newValidmove.save()
    .then(() => res.json("Valid move added!"))
    .catch(err => res.status(400).json('Error', + err));
});

router.route('/:id').get((req, res) => {
    Validmove.findById(req.params.id)
        .then(validmoves => res.json(validmoves))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Validmove.findByIdAndDelete(req.params.id)
        .then(() => res.json('Valid move data deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
