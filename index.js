const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const scoreRouter = require('./routes/scores');

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('UPDATE_SCORE', (message) =>     {
        console.log(`received update-score ws, payload ${JSON.stringify(message, null, 4)}`);
        io.emit('UPDATE_SCORE', message );
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