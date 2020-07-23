const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const envConfig = require('./config/env.config');
const initMiddleware = require('./config/middleware.config');
const environment = process.env.NODE_ENV || 'development';
const envOpts = envConfig[environment];

const app = express();

initMiddleware(app, envOpts.rootPath);


/*initDb(envOpts.dbConnectionStr)
  .then((users) => {
    console.log('successfully connected to database ', users);

    console.log(`server running on port: ${envOpts.port}`);

  })
  .catch((error) => {
      console.log('ERROR:', error)
  });*/

app.use('/', indexRouter);
app.use('/users', usersRouter);


   
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message:message });
  next();
});


module.exports = app;
