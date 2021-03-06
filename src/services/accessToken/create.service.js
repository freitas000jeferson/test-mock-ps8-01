const moment = require('moment');
const { encryptor } = require('../../helpers');
const {
  refreshTokenExpiresIn,
  accessTokenExpiresIn,
} = require('../../config/env');

module.exports = {
  create: async (payload) => {
    const token = encryptor.generateToken(
      {
        ...payload,
        iat: moment().unix(),
      },
      {
        algorithm: 'HS384',
        expiresIn: accessTokenExpiresIn,
      }
    );

    const refreshTokenPayload = {
      sub: {
        id: payload.sub.phoneNumber,
      },
      iat: moment().unix(),
    };

    const refreshToken = encryptor.generateToken(refreshTokenPayload, {
      algorithm: 'HS256',
      expiresIn: refreshTokenExpiresIn,
    });

    return { token, refreshToken };
  },
};
