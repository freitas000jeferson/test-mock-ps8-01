class PossibleAnswer {
  constructor({ possibleAnswer, possibleQuestion }) {
    this.possibleAnswer = possibleAnswer;
    this.possibleQuestion = possibleQuestion;
  }

  toMap() {
    return {
      possibleAnswer: this.possibleAnswer,
      possibleQuestion: this.possibleQuestion,
    };
  }
}
module.exports = PossibleAnswer;
