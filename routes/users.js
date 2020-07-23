var express = require('express');
var router = express.Router();
//const { check } = require('express-validator');
const userCtrl = require('../ctrls/userCtrl');
const { isAuth } = require('../middleware/is-auth');



router
  .get('/names', isAuth, userCtrl.names)
  .post('/registration', userCtrl.registration)
  .post('/login', userCtrl.login)

module.exports = router;
