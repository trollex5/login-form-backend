module.exports = function(app) {
    return {
        user: require('./user')(app)
    };
};
