const { catchAsync } = require('../utils');
const DocumentsScanning = require('../dto/documents_scanning');
const firebase = require('../config/firebase');

const firestore = firebase.firestore();

module.exports = {
  save: catchAsync(async (req, res) => {
    try {
      const file = new DocumentsScanning(req.body);

      const data = file.toJson();
      console.log(data);
      await firestore
        .collection('scanning')
        .doc(`${data.phoneNumber}`)
        .set(data);

      res.status(200).send({
        apiVersion: '1;2021-06-14',
        transactionId: 'e6e4e0f4-089d-4194-845e-78f45426f7c7',
        data: {
          protocol: 'ACBC1233123123',
          message: 'Registro cadastrado com sucesso',
          status: 1,
          recordCode: data.phoneNumber,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }),
};
