const io = require('./app').io;

module.exports = {
    'deal': (socket, data) => {
        data = data.trim();

        switch (data) {
            case '/list people': {
                const users = Object.values(io.sockets.sockets).
                    map(socket => socket.username);

                socket.emit('new message', {
                    username: 'sys',
                    message: users
                });
            }
        }
    },
};
