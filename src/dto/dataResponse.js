const Customers = require('./customers');

class DataResponse {
  constructor(data) {
    this.apiVersion = '1;2020-09-04';
    this.transactionId = data.transactionId;
    this.data = new Customers(data);
    this.phoneNumber = data.phoneNumber;
  }

  toFirebase() {
    return {
      ...this.data.toMap(),
      transactionId: this.transactionId,
      phoneNumber: this.phoneNumber,
    };
  }

  toMap() {
    if (!this.data) return undefined;
    return {
      apiVersion: this.apiVersion,
      transactionId: this.transactionId,
      data: this.data.toMap(),
    };
  }
}

module.exports = DataResponse;
