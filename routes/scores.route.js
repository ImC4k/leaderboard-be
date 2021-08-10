const router = require('express').Router();
let Score = require('../models/score.model');

router.route('/initial-scores').get((req, res) => {
    console.log('gettings scores');
    Score.find({})
    .then(scores => {
        console.log(`scores: ${JSON.stringify(scores, null, 4)}`);
        res.json(scores);
    });
});

module.exports = router;