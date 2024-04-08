const express = require('express');
const router = express.Router();
const auth = require('../../Middlewares/auth');
const assets = require('./AssetController')

router.post('/viewassets',auth,  assets.viewAssets);
router.post('/updateaddassets', auth, assets.addUpdateAssets)
router.post('/deleteasset', auth, assets.deleteAsset)

module.exports = router;
