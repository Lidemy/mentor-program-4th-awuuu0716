const http = require('http');

const args = process.argv;
const index = args[2];

const list = () => {
  const options = {
    method: 'get',
    host: 'restcountries.eu',
    path: `/rest/v2/name/${index}`,
  };
  const callback = (response) => {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('end', () => {
      const result = JSON.parse(str);
      result.forEach((element) => {
        const {
          name,
          capital,
          currencies,
          callingCodes,
        } = element;
        console.log('============');
        console.log(`國家： ${name}`);
        console.log(`首都： ${capital}`);
        console.log(`貨幣： ${currencies[0].code}`);
        console.log(`國碼： ${callingCodes[0]}`);
      });
    });
  };

  http.request(options, callback).end();
};

list();
