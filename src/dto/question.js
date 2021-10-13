const PossibleAnswer = require('./possibleAnswer');

class Question {
  constructor({
    id,
    question,
    orderQuestionDisplay,
    numberTimesQuestionDisplayed,
    status,
    rightAnswer,
    rightQuestion,
    possibleAnswers,
    answer,
  }) {
    this.id = id;
    this.question = question;
    this.orderQuestionDisplay = orderQuestionDisplay;
    this.numberTimesQuestionDisplayed = numberTimesQuestionDisplayed;
    this.status = status;
    this.rightAnswer = rightAnswer;
    this.rightQuestion = rightQuestion;
    this.answer = answer || '';
    this.possibleAnswers = possibleAnswers.map(
      (ans) => new PossibleAnswer(ans)
    );
  }

  toMap() {
    return {
      id: this.id,
      question: this.question,
      orderQuestionDisplay: this.orderQuestionDisplay,
      numberTimesQuestionDisplayed: this.numberTimesQuestionDisplayed,
      status: this.status,
      rightAnswer: this.rightAnswer,
      rightQuestion: this.rightQuestion,
      answer: this.answer,
      possibleAnswers: this.possibleAnswers.map((ans) => ans.toMap()),
    };
  }
}
module.exports = Question;
