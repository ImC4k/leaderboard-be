const express = require('express');
const cors = require('cors');
const http = require('http').createServer();
const app = express();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const scoreRouter = require('./routes/score');

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('UPDATE_SCORE', (message) =>     {
        console.log(`received update-score ws, payload ${JSON.stringify(message, null, 4)}`);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});

app.use(cors());
app.use(express.json());
app.use('/scores', scoreRouter);

http.listen(8081, () => console.log('listening on http://localhost:8081') );

process.on('SIGINT', function () {
    console.log('Caught interrupt signal');
    console.log('Bye Bye');
    process.exit();
});