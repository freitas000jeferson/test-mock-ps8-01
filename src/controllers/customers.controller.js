// const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const firebase = require('../config/firebase');
const DataResponse = require('../dto/dataResponse');
const NotifyCustomerUpdate = require('../dto/notifyCustomerUpdate');

const firestore = firebase.firestore();

module.exports = {
  add: catchAsync(async (req, res) => {
    try {
      const data = req.body;
      const { phoneNumber } = req.body;
      const file = new DataResponse(data);
      await firestore
        .collection('customers')
        .doc(`${phoneNumber}`)
        .set(file.saveFirebase());
      res.send('Record saved successfuly: CUSTOMERS');
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
  update: catchAsync(async (req, res) => {
    console.log('PUT');
    const { id } = req.params;
    console.log(id);
    const file = await firestore.collection('customers').doc(id);
    const response = await file.get();
    if (!response.data()) return res.status(404).send('Customer not found');
    const dataResponse = new DataResponse(response.data());
    dataResponse.data.status = 10;
    await file.set(dataResponse.saveFirebase());
    return res.status(200).send('salvo');
  }),
  updateStatus: catchAsync(async (req, res) => {
    try {
      const { data } = req.body;
      const { contacts } = data;
      const notifyCustomerUpdate = new NotifyCustomerUpdate(data);

      if (contacts.length === 0)
        return res.status(400).send('Not phone number');
      const [{ phoneNumber }] = contacts;
      const file = await firestore.collection('customers').doc(phoneNumber);
      const response = await file.get();
      if (!response.data()) return res.status(404).send('Customer not found');

      const dataResponse = new DataResponse(response.data());
      dataResponse.data.update(notifyCustomerUpdate.toMap());
      await file.set(dataResponse.saveFirebase());
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
  updateAll: catchAsync(async (req, res) => {
    try {
      const file = await firestore.collection('customers');
      const snapshot = await file.get();
      console.log(snapshot.docs.length);
      const promises = [];
      snapshot.docs.forEach(async (doc) => {
        const dataResponse = new DataResponse(doc.data());
        dataResponse.data.status = 10;
        dataResponse.data.addresses.flagValidAddress = false;
        // console.log(dataResponse.saveFirebase());
        promises.push(doc.ref.set({ ...dataResponse.saveFirebase() }));
      });
      await Promise.all(promises);
      res.send('Record saved successfuly: CUSTOMERS');
    } catch (error) {
      console.log(error);
      res.status(400).send(`Error in save CUSTOMERS: ${error}`);
    }
  }),
};
