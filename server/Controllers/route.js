const express = require('express');
const user = require('./User/_routes');
const api = require('./Api/_routes');
const assets = require('./Assets/_routes');
const chat = require('./ChatGeneration/_routes');

const router = express.Router();
router.use('/user',  user);
router.use('/apiupdate', api);
router.use('/assets', assets);
router.use('/chat', chat)
module.exports = router