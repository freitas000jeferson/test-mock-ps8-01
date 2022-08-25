const router = require('express').Router();
const { customers } = require('../controllers');
// const { validate } = require('../middlewares');
// const {
//   validationSchemas: { general },
// } = require('../validations');

router.get('/details', customers.get);
router.post('/add', customers.add);
router.put('/:id', customers.update);
router.post('/subscriptions/notifications', customers.updateStatus);
module.exports.customers = router;
