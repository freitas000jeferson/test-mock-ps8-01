const { catchAsync } = require('../utils');

const firebase = require('../config/firebase');
const Token = require('../dto/token');

const firestore = firebase.firestore();
module.exports = {
  generate: catchAsync(async (req, res) => {
    const { documentNumber, phoneNumber } = req.body;
    const data = new Token({
      documentNumber,
      phoneNumber,
    });
    data.createExpirationTime();
    data.createOtpToken();
    await data.createSessionId();

    await firestore
      .collection('tokens')
      .doc(`${phoneNumber}`)
      .set(data.saveData());

    res.send(data.toMap());
  }),
  validate: catchAsync(async (req, res) => {
    const { documentNumber, phoneNumber, otpSessionId, otpToken } = req.body;
    const document = await firestore.collection('tokens').doc(phoneNumber);
    const get = await document.get();
    if (!get.data()) {
      res.status(404).send({
        apiVersion: '1; 2020-06-11',
        transactionId: 'e6e4e0f4-089d-4194-845e-78f45426f7c7',
        data: {
          isValid: false,
          error: 'Token with the given ID not found',
        },
      });
      return;
    }
    const data = new Token(get.data());
    const isValidToken =
      data.checkDocument(documentNumber) &&
      data.checkTime() &&
      data.checkToken({ otpSessionId, otpToken });
    res.send({
      apiVersion: '1; 2020-06-11',
      transactionId: 'e6e4e0f4-089d-4194-845e-78f45426f7c7',
      data: {
        isValid: !!isValidToken,
      },
    });
  }),
  getOtpChannels: catchAsync(async (req, res) => {
    const { phoneNumber } = req.body;

    const response = {
      otpchannels: {
        phoneNumbers: [phoneNumber],
        emailAddresses: [],
        loginEmails: [],
      },
      loginCredential: '',
      isResidential: false,
      isMovel: true,
    };
    res.send(response);
  }),
};
