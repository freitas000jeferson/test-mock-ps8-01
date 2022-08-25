const yup = require('yup');

const get = {
  query: yup.object().shape({
    name: yup.string().default(''),
  }),
};
const getQuiz = {
  body: yup.object().shape({
    data: yup.object({
      categoryId: yup.string(),
      telephoneNumber: yup.string(),
      documentNumber: yup.string(),
      questionnaireChannel: yup.string(),
    }),
  }),
};
const createQuiz = {
  body: yup.object().shape({
    data: yup.object({
      documentNumber: yup.string(),
      phoneNumber: yup.string(),
      questionnaireId: yup.string(),
      questions: yup.array(),
    }),
  }),
};
const registerQuiz = {
  params: yup.object().shape({
    id: yup.string(),
  }),
  body: yup.object().shape({
    data: yup.object({
      categoryId: yup.string(),
      telephoneNumber: yup.string(),
      documentNumber: yup.string(),
      questionnaireChannel: yup.string(),
      questions: yup.array(),
    }),
  }),
};
const createScanning = {
  body: yup.object().shape({
    data: yup.array().of(
      yup.object().shape({
        field: yup.string(),
        value: yup.string(),
      })
    ),
    attachments: yup.array().of(
      yup.object().shape({
        type: yup.string(),
        attachment: yup.string(),
      })
    ),
  }),
};

const update = {
  params: yup.object().shape({
    id: yup.string(),
  }),
};
module.exports.general = {
  get,
  getQuiz,
  createQuiz,
  registerQuiz,
  update,
  createScanning,
};
