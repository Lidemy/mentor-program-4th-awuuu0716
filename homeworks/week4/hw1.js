const http = require('http');

const options = {
  host: 'lidemy-book-store.herokuapp.com',
  path: '/books?_limit=10',
};

const callback = (response) => {
  let str = '';
  response.on('data', (chunk) => {
    str += chunk;
  });

  response.on('end', () => {
    const result = JSON.parse(str);
    console.log(result);
  });
};

http.request(options, callback).end();
