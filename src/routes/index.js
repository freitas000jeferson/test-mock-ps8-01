const { hc } = require('./hc.routes');
const { customers } = require('./customers.routes');
const { quiz } = require('./quiz.routes');
const { tokens } = require('./tokens.routes');
const { scanning } = require('./scanning.routes');
const { mobilesubscribers } = require('./mobilesubscribers.routes');
const { mock } = require('./mock-v2.routes');

module.exports = {
  scanning,
  hc,
  customers,
  quiz,
  tokens,
  mobilesubscribers,
  mock,
};
