var express = require('express');
var router = express.Router();
//const { check } = require('express-validator');
const { isAuth } = require('../middleware/is-auth');



router
  .get('/names', isAuth, async function(req, res) {
    const { userId } = req;
    
    try {
      const namesResult = await req.app.controllers.user.names({ userId });
      res.status(namesResult.status === 'found' ? 200 : 204).json(namesResult);
    } catch (err) {
      res.status(204).json({error: err});
    }
  })
  .post('/registration', async function(req, res, next) {
    const {email, password, user_name, first_name, last_name} = req.body;

    try {
      const registrationResult = await req.app.controllers.user.registration({
        email,
        password,
        user_name,
        first_name,
        last_name
      });

      res.status(registrationResult.status === 'success' ? 201 : 500).json(registrationResult);
    } catch (err) {
      res.status(500).json({error: err});
    }
  })
  .post('/login', async function(req, res, next) {
    const { user_name, password } = req.body;

    try {
      const loginResult = await req.app.controllers.user.login({user_name, password});

      res.status(loginResult.status === 'success' ? 200 : 500).json(loginResult);
    } catch (err) {
      res.status(204).json({error: err});
    }
})

module.exports = router;
