class Address {
  constructor({
    streetType,
    streetName,
    streetNr,
    complement,
    neighborhood,
    poBoxAddress,
    cityName,
    state,
    flagValidAddress,
    postcode,
  }) {
    this.streetType = streetType || 'NULL';
    this.streetName = streetName || 'NULL';
    this.streetNr = streetNr || 'NULL';
    this.neighborhood = neighborhood || 'NULL';
    this.poBoxAddress = poBoxAddress || 'NULL';
    this.cityName = cityName || 'NULL';
    this.state = state || 'NULL';
    this.flagValidAddress = flagValidAddress || false;
    this.postcode = postcode || 'NULL';
    this.complement = complement || 'NULL';
  }

  saveFirebase() {
    return {
      streetType: this.streetType,
      streetName: this.streetName,
      streetNr: this.streetNr,
      complement: this.complement,
      neighborhood: this.neighborhood,
      poBoxAddress: this.poBoxAddress,
      cityName: this.cityName,
      state: this.state,
      flagValidAddress: this.flagValidAddress,
      postcode: this.postcode,
    };
  }

  toMap() {
    return {
      streetType: this.streetType,
      streetName: this.streetName,
      streetNr: this.streetNr,
      complement: this.complement,
      neighborhood: this.neighborhood,
      poBoxAddress: this.poBoxAddress,
      cityName: this.cityName,
      state: this.state,
      flagValidAddress: this.flagValidAddress,
      postcode: this.postcode,
    };
  }

  update({
    streetType,
    streetName,
    streetNr,
    complement,
    neighborhood,
    poBoxAddress,
    cityName,
    state,
    flagValidAddress,
    postcode,
  }) {
    this.streetType = streetType || this.streetType;
    this.streetName = streetName || this.streetName;
    this.streetNr = streetNr || this.streetNr;
    this.neighborhood = neighborhood || this.neighborhood;
    this.poBoxAddress = poBoxAddress || this.poBoxAddress;
    this.cityName = cityName || this.cityName;
    this.state = state || this.state;
    this.flagValidAddress = flagValidAddress || this.flagValidAddress;
    this.postcode = postcode || this.postcode;
    this.complement = complement || this.complement;
  }
}
module.exports = Address;
