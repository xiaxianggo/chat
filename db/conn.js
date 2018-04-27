var mysql = require('mysql');
var moment = require('moment');

var conn = mysql.createConnection({
    host: '35.189.178.51',
    user: 'root',
    password: 'hzzz',
    database: 'hzzz'
});

module.exports = {

    'createTable': () => {
        var sql = 'CREATE TABLE IF NOT EXISTS MESSAGES (IP VARCHAR(30), NAME VARCHAR(20), MSG TEXT, AT TIMESTAMP)';
        conn.query(sql, (err, result) => {
            if (err) console.error(err);
            console.log('Table created');
        });
    },

    'save': (ip, name, msg) => {
        data = {
            ip: ip,
            name: name,
            msg: msg,
            at: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        console.log(data);
        conn.query('INSERT INTO MESSAGES set ?', data, (err, result) => {
            if (err) console.error(err);
            console.log('Message saved');
        });
    }
};