const mysql = require('mysql');
const moment = require('moment');

const config = require('./config');

const conn = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS
});

module.exports = {
    'initMessageDB': () => {
        conn.query(`CREATE DATABASE IF NOT EXISTS ${config.DB_DATABASE}`,
            (err) => {
                if (err) throw err;
                conn.query(`USE ${config.DB_DATABASE}`, (err) => {
                    if (err) throw err;
                    conn.query(
                        'CREATE TABLE IF NOT EXISTS MESSAGES (IP VARCHAR(30), NAME VARCHAR(20), MSG TEXT, AT TIMESTAMP)',
                        (err) => {
                            if (err) throw err;
                            console.log('MessageDB inited');
                        });
                });
            });
    },

    'save': (ip, name, msg) => {
        data = {
            ip: ip,
            name: name,
            msg: msg,
            at: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        console.log(data);
        conn.query('INSERT INTO MESSAGES set ?', data, (err, result) => {
            if (err) console.error(err);
            console.log('Message saved');
        });
    }
};