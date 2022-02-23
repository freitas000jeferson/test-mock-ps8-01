const { hc } = require('./hc.routes');
const { customers } = require('./customers.routes');
const { quiz } = require('./quiz.routes');
const { tokens } = require('./tokens.routes');
const { scanning } = require('./scanning.routes');

module.exports = { scanning, hc, customers, quiz, tokens };
