const express = require('express');
const router = express.Router();
const chat = require('./AuthChat')

const auth = require('../../Middlewares/auth');

router.post('/receiveplan', auth, chat.apiCompletion)

module.exports = router;