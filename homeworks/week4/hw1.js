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
    result.forEach((element) => {
      console.log(`${element.id} ${element.name}`);
    });
  });
};

http.request(options, callback).end();
