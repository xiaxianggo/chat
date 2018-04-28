module.exports = {
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