const fs = require('fs');
const { findIndex } = require('lodash');

const updateScore = ({name, diff}) => {
    return new Promise((resolve, reject) => {
        const scoresFilePath = './scores.json';
        const scores = require(scoresFilePath);

        const playerIndex = findIndex(scores, {name: name});
        if (playerIndex === -1) { // not found
            scores.push({name: name, score: diff});
        }
        else {
            scores[playerIndex].score += diff;
        }

        console.log(`writing data: ${JSON.stringify(scores, null, 4)}`);
        fs.writeFile(scoresFilePath, JSON.stringify(scores, null, 4), () => {console.log(`updated data to ${scoresFilePath}`)});
        resolve(scores);
    })
};

module.exports = {
    updateScore
};