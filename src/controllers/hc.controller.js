const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { port, version, clientURL } = require('../config/env');

module.exports = {
  get: catchAsync(async (req, res) =>
    res.status(StatusCodes.OK).json({
      message: 'api ok',
      port,
      version: `${version}.0.1`,
      clientURL,
      date: new Date().toISOString(),
    })
  ),
};
