const GetQuizResponse = require('./getQuizResponse');

class GetQuizApiResponse {
  constructor(data) {
    this.phoneNumber = data.phoneNumber;
    this.documentNumber = data.documentNumber;
    this.data = new GetQuizResponse(data);
  }

  responseAPI() {
    return {
      apiVersion: '1; 2020-06-11',
      transactionId: 'a251ee23-795c-4ea2-b63f-0fc60e81f9b1',
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
