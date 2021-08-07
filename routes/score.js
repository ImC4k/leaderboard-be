const router = require('express').Router();
const initialScores = require('../initialScores.json');

router.route('/initial-scores').get((req, res) => {
    res.json(initialScores);
});

module.exports = router;