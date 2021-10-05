class Customers {
  constructor({
    personType,
    category,
    name,
    birthdate,
    motherName,
    nationality,
    documents,
    contacts,
    addresses,
    socioeconomics,
    customerId,
    status,
    quantityAttemptsRegister,
  }) {
    this.personType = personType;
    this.category = category || [];
    this.name = name;
    this.birthdate = birthdate;
    this.motherName = motherName;
    this.nationality = nationality || '';
    this.documents = documents || [];
    this.contacts = contacts || [];
    this.addresses = addresses || {};
    this.socioeconomics = socioeconomics || {};
    this.customerId = customerId;
    this.status = status;
    this.quantityAttemptsRegister = quantityAttemptsRegister;
  }

  toMap() {
    return {
      personType: this.personType,
      category: this.category,
      name: this.name,
      birthdate: this.birthdate,
      motherName: this.motherName,
      nationality: this.nationality,
      documents: this.documents,
      contacts: this.contacts,
      addresses: this.addresses,
      socioeconomics: this.socioeconomics,
      customerId: this.customerId,
      status: this.status,
      quantityAttemptsRegister: this.quantityAttemptsRegister,
    };
  }
}

module.exports = Customers;
