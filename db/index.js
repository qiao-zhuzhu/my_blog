var mysql = require('mysql');

//引入mysql模块
var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'node-blog'
})

module.exports = conn