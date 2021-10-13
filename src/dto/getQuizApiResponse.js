const GetQuizResponse = require('./getQuizResponse');

class GetQuizApiResponse {
  constructor(data) {
    this.phoneNumber = data.phoneNumber;
    this.documentNumber = data.documentNumber;
    this.data = new GetQuizResponse(data);
  }

  responseAPI() {
    return {
      apiVersion: 'dasdas',
      transactionId: 'dasdasdas',
      data: this.data.toMap(),
    };
  }

  saveToFirebase() {
    return {
      ...this.data.toMap(),
      phoneNumber: this.phoneNumber,
      documentNumber: this.documentNumber,
    };
  }
}
module.exports = GetQuizApiResponse;
