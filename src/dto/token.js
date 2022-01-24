const { create } = require('../services/accessToken/index');

class Token {
  constructor({
    documentNumber,
    phoneNumber,
    otpSessionId,
    otpToken,
    expirationTime,
    token,
    refreshToken,
  }) {
    this.documentNumber = documentNumber;
    this.phoneNumber = phoneNumber;
    this.otpSessionId = otpSessionId;
    this.otpToken = otpToken;
    this.expirationTime = expirationTime;
    this.token = token;
    this.refreshToken = refreshToken;
  }

  createOtpToken() {
    this.otpToken = Math.floor(Math.random() * (999999 - 100000) + 100000);
  }

  async createSessionId() {
    const payload = {
      sub: {
        documentNumber: this.documentNumber,
        phoneNumber: this.phoneNumber,
      },
    };
    const data = await create(payload);
    this.token = data.token;
    this.refreshToken = data.refreshToken;
    this.otpSessionId = data.token;
  }

  createExpirationTime() {
    const addMinutes = 10;
    const exTime = new Date();
    exTime.setMinutes(exTime.getMinutes() + addMinutes);
    this.expirationTime = Math.floor(exTime.getTime() / 1000);
  }

  saveData() {
    return {
      documentNumber: this.documentNumber,
      phoneNumber: this.phoneNumber,
      otpSessionId: this.otpSessionId,
      otpToken: this.otpToken,
      expirationTime: this.expirationTime,
      token: this.token,
      refreshToken: this.refreshToken,
    };
  }

  toMap() {
    return {
      apiVersion: '1; 2020-06-11',
      transactionId: 'e6e4e0f4-089d-4194-845e-78f45426f7c7',
      data: {
        otpToken: this.otpToken,
        otpSessionId: this.otpSessionId,
        requestId: 'e6e4e0f4',
      },
    };
  }

  checkDocument(documentNumber) {
    return this.documentNumber === documentNumber;
  }

  checkToken({ otpToken, otpSessionId }) {
    return this.otpToken == otpToken && this.otpSessionId == otpSessionId;
  }

  checkTime() {
    const now = new Date();
    const time = Math.floor(now.getTime() / 1000);
    return !!(this.expirationTime && time - this.expirationTime < 0);
  }
}
module.exports = Token;
