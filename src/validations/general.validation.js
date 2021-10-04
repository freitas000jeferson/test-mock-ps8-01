const yup = require('yup');
const get = {
  query: yup.object().shape({
    name: yup.string().default(''),
  }),
};
module.exports.general = { get };
