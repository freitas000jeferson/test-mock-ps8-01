class NotifyCustomerUpdate {
  constructor({ address, status, categoryId, name, documentNumber, contacts }) {
    this.addresses = address;
    this.categoryId = categoryId;
    this.contacts = contacts;
    this.documentNumber = documentNumber;
    this.name = name;
    this.status = status;
  }

  toMap() {
    return {
      addresses: this.addresses,
      status: this.status,
      categoryId: this.categoryId,
      name: this.name,
      documentNumber: this.documentNumber,
      contacts: this.contacts,
    };
  }
}

module.exports = NotifyCustomerUpdate;
