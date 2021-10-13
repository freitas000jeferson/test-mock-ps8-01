const router = require('express').Router();
const { quiz } = require('../controllers');
const { validate } = require('../middlewares');
const {
  validationSchemas: { general },
} = require('../validations');

router.post('/add', validate(general.createQuiz), quiz.create);
router.post('/questionnaires', validate(general.getQuiz), quiz.createQuiz);
router.post(
  '/questionnaires/:id',
  validate(general.registerQuiz),
  quiz.answerQuestion
);
module.exports.quiz = router;
