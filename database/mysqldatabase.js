const mysql = require('mysql');


//Local
 module.exports = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'admin_pro',
}); 