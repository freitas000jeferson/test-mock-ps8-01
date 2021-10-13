const Customers = require('./customers');

class DataResponse {
  constructor(data) {
    this.apiVersion = '1;2020-09-04';
    this.transactionId = data.transactionId;
    this.data = new Customers(data);
  }

  saveFirebase() {
    return {
      ...this.data.toMapSaveFirebase(),
      transactionId: this.transactionId,
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

  setObjectToMap(obj) {
    return this.saveFirebase();
  }
}

module.exports = DataResponse;
