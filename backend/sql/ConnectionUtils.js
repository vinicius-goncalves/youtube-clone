const mysql = require('mysql2/promise')

function getConnection() {

    const databaseConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'youtube'
    }
    
    const conn = mysql.createConnection(databaseConfig)
    return conn

}

module.exports = {
    getConnection,
}