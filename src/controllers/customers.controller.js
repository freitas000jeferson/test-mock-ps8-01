// const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const firebase = require('../config/firebase');
const DataResponse = require('../dto/dataResponse');

const firestore = firebase.firestore();

module.exports = {
  add: catchAsync(async (req, res) => {
    try {
      const data = req.body;
      const { phoneNumber } = req.body;
      console.log(phoneNumber);
      const file = new DataResponse(data);

      await firestore
        .collection('customers')
        .doc(`${phoneNumber}`)
        .set(file.toFirebase());
      res.send('Record saved successfuly');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }),
  get: catchAsync(async (req, res) => {
    try {
      const querystring = req.headers['x-querystring'];
      if (!querystring) res.status(400).send('ERROR X-QueryString');

      const phoneNumber = querystring.trim().split(';')[1].split('=')[1];
      if (!phoneNumber) res.status(400).send('ERROR not phone number');

      const customers = await firestore
        .collection('customers')
        .doc(phoneNumber);

      const customer = await customers.get();
      const data = new DataResponse(customer.data());

      if (!data) {
        res.status(404).send('Customer with the given ID not found');
      } else {
        res.send(data.toMap());
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }),
  updateStatus: catchAsync(async (req, res) => {
    try {
      const { data } = req.body;
      const { contacts } = data;
      if (contacts.length === 0)
        return res.status(400).send('Not phone number');
      const [{ phoneNumber }] = contacts;
      const file = await firestore.collection('customers').doc(phoneNumber);
      const customer = await file.get();
      if (!customer.data()) return res.status(404).send('Customer not found');
      const obj = Object.assign(customer.data(), data);
      await file.set({
        ...obj,
      });
      return res.send({
        apiVersion: '1; 2020-06-11',
        transactionId: 'e6e4e0f4-089d-4194-845e-78f45426f7c7',
        data: {
          transactionId: '1234567890',
          transactionOrigin: '1234',
          transactionDate: '2009-01-12T12:10:30-03:00',
        },
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }),
};
