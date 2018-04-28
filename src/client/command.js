function startWith(data, s) {
    if (typeof data === 'string' || data instanceof String) {
        return data.startsWith(s);
    }
    return false;
}

function getLeftOver(data, s) {
    if (startWith(data, s)) {
        const pics = data.split(s);
        return pics.length > 0 ? pics[1].trim() : '';
    }
    return '';
}

module.exports = {
    'isPic': (data) => {
        return startWith(data, '#pic');
    },
    'getPic': (data) => {
        return getLeftOver(data, '#pic');
    },
    'isAssign': (data, username) => {
        return startWith(data, `@${username}`);
    }
};