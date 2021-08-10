require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
const { updateScore } = require('./scores_utils');

const DB_URI = process.env.DB_URI;
const WS_SECRET = process.env.WS_SECRET;
mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const dbConnection = mongoose.connection;
dbConnection.once('open', () => {
    console.log('MongoDB database connected');
});

const scoreRouter = require('./routes/scores.route');

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('UPDATE_SCORE', (message) => {
        const { secret } = message;
        if (JSON.stringify(secret) === JSON.stringify(WS_SECRET)) {
            console.log(`received update-score ws, payload ${JSON.stringify(message, null, 4)}`);
            updateScore(message);
            console.log('continuing');
            io.emit('UPDATE_SCORE', message );
        }
        else {
            console.log(`got bad secret`);
        }
    });
});

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", 'PUT, GET');
    next();
  });
app.use(express.json());
app.use('/api/scores', scoreRouter);

http.listen(process.env.PORT || 8081, () => console.log('listening on http://localhost:8081'));

process.on('SIGINT', function () {
    console.log('Caught interrupt signal');
    console.log('Bye Bye');
    process.exit();
});