const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');

module.exports = {
  get: catchAsync(async (req, res) =>
    res.status(StatusCodes.OK).json({ message: 'api ok' })
  ),
};
