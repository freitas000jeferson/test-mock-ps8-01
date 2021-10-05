const router = require('express').Router();
const { hc } = require('../controllers');
const { validate } = require('../middlewares');
const {
  validationSchemas: { general },
} = require('../validations');

router.get('/', validate(general.get), hc.get);

module.exports.hc = router;
