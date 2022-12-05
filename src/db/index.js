const mysql = require('mysql'),
    util = require('util'),
    connection = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'db_sino_test'

    };
const db = mysql.createConnection(connection);

// node native promisify
const query = util.promisify(db.query).bind(db);
module.exports = { db, query };