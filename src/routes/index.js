const { hc } = require('./hc.routes');
const { customers } = require('./customers.routes');
const { quiz } = require('./quiz.routes');
const { tokens } = require('./tokens.routes');

module.exports = { hc, customers, quiz, tokens };
