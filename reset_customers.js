const axios = require('axios').default;

async function updateAll() {
  console.log('INICIOU');
  await axios
    .put(`https://mock-ps8-01.vercel.app/api/v1/customers/all`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('FIM');
    });
}
updateAll();
