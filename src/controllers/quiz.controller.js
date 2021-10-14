// const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const firebase = require('../config/firebase');
const GetQuizApiResponse = require('../dto/getQuizApiResponse');

const firestore = firebase.firestore();
module.exports = {
  create: catchAsync(async (req, res) => {
    try {
      const { data } = req.body;
      const { phoneNumber } = data;

      const file = new GetQuizApiResponse(data);
      await firestore
        .collection('quiz')
        .doc(`${phoneNumber}`)
        .set(file.saveToFirebase());
      res.send('Record saved successfuly: QUIZ');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }),
  createQuiz: catchAsync(async (req, res) => {
    const {
      data: { telephoneNumber },
    } = req.body;
    console.log(telephoneNumber);
    const file = await firestore.collection('quiz').doc(telephoneNumber).get();
    const data = new GetQuizApiResponse(file.data());

    if (!data) {
      res.status(404).send('Customer with the given ID not found');
    } else {
      res.send(data.responseAPI());
    }
  }),
  answerQuestion: catchAsync(async (req, res) => {
    const { data } = req.body;
    const { telephoneNumber } = data;
    const file = await firestore.collection('quiz').doc(telephoneNumber);
    const response = await file.get();
    const quiz = new GetQuizApiResponse(response.data());
    data.questions.forEach((answer, id) => {
      const auxQuestion = quiz.data.questions.find(
        (element) => element.id === answer.id
      );
      auxQuestion.status = answer.status;
      auxQuestion.numberTimesQuestionDisplayed =
        answer.numberTimesQuestionDisplayed;
      auxQuestion.answer = answer.answer;
    });
    await file.set(quiz.saveToFirebase());
    res.send({ data: { ...quiz.responseAPI() } });
  }),
};
