const Customers = require('./customers');

class DataResponse {
  constructor(data) {
    this.apiVersion = '1;2020-09-04';
    this.transactionId = data.transactionId
      ? data.transactionId
      : '72cb3ce5-bf66-4516-93ec-921dc39682bd';
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
