'use strict';
const dotenv = require('dotenv');
const path = require('path');
// const assert = require('assert');
dotenv.config({ path: path.join(__dirname, '../../../.env') });

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  MEASUREMENT_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = process.env;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
// assert(PORT, "PORT is required");
// assert(HOST, "HOST is required");
module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: firebaseConfig,
};
