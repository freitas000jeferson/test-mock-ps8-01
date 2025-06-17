const router = require('express').Router();
const { mobilesubscribers } = require('../controllers');
const { validate } = require('../middlewares');
const {
    validationSchemas: { general },
} = require('../validations');

router.get('/', validate(general.get), mobilesubscribers.get);

module.exports.mobilesubscribers = router;