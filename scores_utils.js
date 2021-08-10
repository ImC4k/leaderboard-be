let Score = require('./models/score.model');

const updateScore = ({name, diff}) => {
    return new Promise((resolve, reject) => {
        Score.findOne({name: name})
        .then(playerRecord => {
            if (playerRecord) {
                console.log(`updating score record for ${name}`);
                playerRecord.score += diff;
                return playerRecord.save();
            }
            else {
                console.log(`score record for ${name} is not found, creating a new record`);
                const newScore = new Score({name: name, score: diff});
                return newScore.save();
            }
        })
        .then(savedRecord => {
            console.log(`saved record: ${JSON.stringify(savedRecord, null, 4)}`);
        })
    })
};

module.exports = {
    updateScore
};