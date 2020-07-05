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
    let result;
    try {
      result = JSON.parse(str);
    } catch (err) {
      console.log(err);
    }
    result.forEach((element) => {
      console.log(`${element.id} ${element.name}`);
    });
  });
};

http.request(options, callback).end();
