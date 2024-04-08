const express = require('express')
const api = require('./ApiUpdate')
const auth = require('../../Middlewares/auth');

const router = express.Router();

router.post('/updateapi', auth, api.updateApi);
router.post('/viewapi', auth, api.getApi)
module.exports = router;