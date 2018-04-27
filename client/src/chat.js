import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');


function newMsg(cb) {
    socket.on('new message', data => cb(data));
}

function sendMsg(msg) {
    socket.emit('new message', msg);
}

function addUser(username) {
    socket.on('add user', username);
}

function typing() {
    socket.on('typing');
}

export { newMsg, sendMsg };