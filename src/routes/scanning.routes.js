const router = require('express').Router();
const { scanning } = require('../controllers');
const { validate } = require('../middlewares');
const {
  validationSchemas: { general },
} = require('../validations');

router.post(
  '/documentoscopyanalysis',
  validate(general.createScanning),
  scanning.save
);

module.exports.scanning = router;
