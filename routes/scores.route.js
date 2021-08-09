const router = require('express').Router();

router.route('/initial-scores').get((req, res) => {
    const initialScores = require('../scores.json');
    res.json(initialScores);
});

module.exports = router;