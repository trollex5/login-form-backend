const envConfig = {
    development: {
        dbConnectionStr:'postgres://postgres:posSQL42240@127.0.0.1:5555/postgres',
        jwtSecret:'some-secret',
        port:3001,
        rootPath:'../'
    },

    production: {
        dbConectionStr:'postgres://postgres:posSQL42240@127.0.0.1:5555/postgres',
        port: process.env.PORT || 3001,
        jwtSecret: process.env.SECRET || 'some-secret',
        rootPath:'../'
    }
}

module.exports = envConfig;