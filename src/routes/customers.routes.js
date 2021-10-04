const router = require('express').Router();
const { customers } = require('../controllers');
const { validate } = require('../middlewares');
const {
  validationSchemas: { general },
} = require('../validations');
router.get('/', customers.get);

module.exports.customers = router;
