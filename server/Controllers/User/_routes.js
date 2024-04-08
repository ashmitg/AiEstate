const express = require('express');
const user = require('./AuthController');
const router = express.Router();
const auth = require('../../Middlewares/auth');

router.post('/signup', user.Signup);
router.post('/signin', user.Login);
router.post('/account', auth, user.AccountAuth)
module.exports = router;