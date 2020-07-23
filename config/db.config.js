const pgp = require('pg-promise')(/* options */);
const  db = pgp('postgres://postgres:posSQL42240@127.0.0.1:5555/postgres');

module.exports = db;

