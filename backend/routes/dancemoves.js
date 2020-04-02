const router = require('express').Router();
const DanceMove = require('../models/dancemove');

router.route('/').get((req, res) => {
  DanceMove.find()
    .then(dancemoves => res.json(dancemoves))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const dancerName = req.body.dancerName;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const dateCreated = Date.parse(req.body.dateCreated);
  const newDanceMove = new DanceMove({
    dancerName,
    description,
    duration,
    dateCreated,
  });
  newDanceMove.save()
  .then(() => res.json('DanceMove added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  DanceMove.findById(req.params.id)
    .then(dancemove => res.json(dancemove))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  DanceMove.findByIdAndDelete(req.params.id)
    .then(() => res.json('DanceMove deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  DanceMove.findById(req.params.id)
    .then(dancemove => {
      dancemove.name = req.body.name;
      dancemove.description = req.body.description;
      dancemove.duration = Number(req.body.duration);
      dancemove.dateCreated = Date.parse(req.body.dateCreated);

      dancemove.save()
        .then(() => res.json('DanceMove updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
