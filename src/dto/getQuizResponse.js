const Question = require('./question');

class GetQuizResponse {
  constructor({ questions, questionnaireId }) {
    this.questionnaireId = questionnaireId;
    this.questions = questions.map((question) => new Question(question));
  }

  toMap() {
    return {
      questionnaireId: this.questionnaireId,
      questions: this.questions.map((question) => question.toMap()),
    };
  }
}

module.exports = GetQuizResponse;
