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
    'isPic': (data) => {
        return data.startsWith('#pic');
    },
    'getPic': (data) => {
        const pics = data.split('#pic');
        return pics.length > 0 ? pics[1].trim() : '';
    },
    'isAssign': (data) => {
        return data.startsWith('@');
    }
};