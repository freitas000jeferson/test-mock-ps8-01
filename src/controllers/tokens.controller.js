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
    const error = {
      errorCode: 'API-OTPTOKENS-408',
      detailedMessage: 'STW: API-OTPTOKENS-408',
      status: 408,
    };
    if (!get.data()) {
      res.status(408).send({
        apiVersion: '1; 2020-06-11',
        transactionId: 'e6e4e0f4-089d-4194-845e-78f45426f7c7',
        error: { ...error },
      });
      return;
    }

    const data = new Token(get.data());

    const checkToken = data.checkToken({ otpSessionId, otpToken });
    const checktime = data.checkTime();
    const checkDocument = data.checkDocument(documentNumber);
    console.log(checkToken, checktime, checkDocument);
    if (!checkToken) {
      error.errorCode = 'PI-OTPTOKENS-408';
      error.detailedMessage = 'STW: API-OTPTOKENS-408';
      error.status = 408;
    } else if (!checkDocument) {
      error.errorCode = 'PI-OTPTOKENS-408';
      error.detailedMessage = 'STW: API-OTPTOKENS-408';
      error.status = 408;
    } else if (!checktime) {
      error.errorCode = 'API-OTPTOKENS-400';
      error.detailedMessage = 'STW: 9101';
      error.status = 400;
    }
    const isValidToken = checkDocument && checktime && checkToken;

    if (!isValidToken) {
      res.status(error.status).send({
        apiVersion: '1; 2020-06-11',
        transactionId: 'e6e4e0f4-089d-4194-845e-78f45426f7c7',
        error: { ...error },
      });
      return;
    }
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
      data: {
        otpchannels: {
          phoneNumbers: [phoneNumber],
          emailAddresses: [],
          loginEmails: [],
        },
        loginCredential: '',
        isResidential: false,
        isMovel: true,
      },
    };
    res.send(response);
  }),
};
