const router = require('express').Router();
const Dancer = require('../models/dancer');

router.route('/').get((req, res) => {
  Dancer.find()
    .then(dancers => res.json(dancers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newDancer = new Dancer({username});

  newDancer.save()
    .then(() => res.json('Dancer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
