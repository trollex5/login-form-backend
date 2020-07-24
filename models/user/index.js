

module.exports = function (db) {
    return {
        getById: async function(userId) {
            return db.one('SELECT * FROM users WHERE pk=$1', [userId])
        },
        checkLogin: async function(username, password) {
            return db.one('SELECT * FROM users WHERE user_name=$1 AND password=$2', [username, password]);
        },
        create: async function(userData) {
            return db.one('INSERT INTO users (email, password, user_name, first_name, last_name) VALUES (${email}, ${password}, ${user_name}, ${first_name}, ${last_name}) RETURNING pk', userData);
        }
    }
}