const Address = require('./address');

class Customers {
  constructor({
    // personType,
    // birthdate,
    // motherName,
    // nationality,
    // socioeconomics,
    // category,
    name,
    documents,
    contacts,
    addresses,
    customerId,
    status,
    quantityAttemptsRegister,
    categoryId,
    phoneNumber,
    documentNumber,
  }) {
    // this.birthdate = birthdate;
    // this.motherName = motherName;
    // this.nationality = nationality || '';
    // this.personType = personType;
    // this.socioeconomics = socioeconomics || {};
    // this.category = category || [];
    this.name = name || '';
    this.documents = documents || [];
    this.contacts = contacts || [];
    this.customerId = customerId || '';
    this.status = status || 10;
    this.quantityAttemptsRegister = quantityAttemptsRegister || 0;
    this.addresses = new Address(addresses || {});
    this.phoneNumber = phoneNumber || '';
    this.documentNumber = documentNumber || '';
    this.categoryId = categoryId || '';
  }

  toMap() {
    return {
      name: this.name,
      documents: this.documents,
      contacts: this.contacts,
      addresses: this.addresses.toMap(),
      customerId: this.customerId,
      status: this.status,
      quantityAttemptsRegister: this.quantityAttemptsRegister,
    };
  }

  toMapSaveFirebase() {
    return {
      name: this.name,
      documents: this.documents,
      contacts: this.contacts,
      addresses: this.addresses.saveFirebase(),
      customerId: this.customerId,
      status: this.status,
      quantityAttemptsRegister: this.quantityAttemptsRegister,
      phoneNumber: this.phoneNumber,
      documentNumber: this.documentNumber,
      categoryId: this.categoryId,
    };
  }

  update({ addresses, status, categoryId, name, contacts }) {
    if (status) this.status = status;

    if (status === 23) this.status = 4;
    if (categoryId) this.categoryId = categoryId;
    if (name) this.name = name;
    if (addresses) this.addresses.update(addresses);
    if (contacts[0].email && contacts[0].email !== this.contacts[0].email)
      this.contacts[0].email = contacts[0].email;
  }
}

module.exports = Customers;
