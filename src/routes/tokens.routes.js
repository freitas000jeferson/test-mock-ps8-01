const router = require('express').Router();
const { tokens } = require('../controllers');

router.get('/otptokens', tokens.generate);
router.post('/otptokens', tokens.validate);
router.get('/otpchannels', tokens.getOtpChannels);

module.exports.tokens = router;
