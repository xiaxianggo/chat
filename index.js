const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const db = require('./src/server/db');
const config = require('./src/server/config');

db.initMessageDB();
server.listen(config.SERVICE_PORT, function() {
    console.log('Server listening at port %d', config.SERVICE_PORT);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

let numUsers = 0;

function dealCmd(socket, data) {
    if (data === '/list people') {
        const users = Object.values(io.sockets.sockets).
            map(socket => socket.username);

        socket.emit('new message', {
            username: 'sys',
            message: users
        });
    }
}

io.on('connection', function(socket) {
    let addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function(data) {
        console.log(data);
        if (data.startsWith('/')) {
            dealCmd(socket, data);
            return;
        }

        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });

        db.save(
            socket.handshake.address,
            socket.username,
            data);

    });
    addedUser = false;

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function(username) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function() {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function() {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function() {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});
