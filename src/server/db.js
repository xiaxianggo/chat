const mysql = require('mysql');
const moment = require('moment');

const config = require('./config');

const conn = mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASS
});

module.exports = {
    'initMessageDB': () => {
        conn.query(`CREATE DATABASE IF NOT EXISTS ${config.DB_DATABASE}`,
            err => {
                if (err) console.log(err);
                conn.query(`USE ${config.DB_DATABASE}`, err => {
                    if (err) console.log(err);
                    const sql = 'CREATE TABLE IF NOT EXISTS MESSAGES (IP VARCHAR(30), NAME VARCHAR(20), MSG TEXT, AT TIMESTAMP)';
                    conn.query(sql, err => console.log(err || 'MessageDB inited'));
                });
            }
        );
    },

    'save': (ip, name, msg) => {
        data = {
            ip: ip,
            name: name,
            msg: msg,
            at: moment().utcOffset(+8).format('YYYY-MM-DD HH:mm:ss')
        };
        console.log(data.at);
        conn.query('INSERT INTO MESSAGES set ?', data,
            (err, result) => console.log(err || 'Message saved'));
    }
};