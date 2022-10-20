const { getConnection } = require('./ConnectionUtils')

async function insertUser(user_uuid, username, email, password, channel_url) {

    const sql = 'INSERT INTO users_account VALUES (DEFAULT, ?, ?, ?, ?, ?)'
    const conn = await getConnection()
    const [ resultSet ] = await conn.execute(sql, [ user_uuid, username, email, password, channel_url ])
    return resultSet

}

async function getUserByChannelURL(channelURL) {
    
    const sql = 'SELECT * FROM users_account WHERE channel_url = ?'
    const conn = await getConnection()
    const [ resultSet ] = await conn.execute(sql, [ channelURL ])
    return resultSet[0]

}

async function getUserByCredentialsHash(emailHash, passwordHash) {

    const sql = 'SELECT * FROM users_account WHERE email = ? AND password = ?'
    const conn = await getConnection()
    const [ resultSet ] = await conn.execute(sql, [ emailHash, passwordHash ])
    return resultSet[0]

}

module.exports = {
    insertUser,
    getUserByChannelURL,
    getUserByCredentialsHash
}