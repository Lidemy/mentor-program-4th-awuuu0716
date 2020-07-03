const http = require('http');

const args = process.argv;
const action = args[2];
const otherInfo = args.slice(3);
const options = {
  method: 'get',
  host: 'lidemy-book-store.herokuapp.com',
  path: '/books?_limit=20',
  headers: {
    'Content-Type': 'application/json',
  },
};

const list = () => {
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
  const req = http.request(options, callback);
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};

const read = () => {
  const callback = (response) => {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('end', () => {
      const result = JSON.parse(str);
      console.log(`${result.id} ${result.name}`);
    });
  };
  const req = http.request(options, callback);
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};

const deleteBook = () => {
  const callback = (response) => {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('end', () => {
      console.log(str);
    });
  };
  const req = http.request(options, callback);
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};

const createBook = (name) => {
  const callback = (response) => {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('end', () => {
      console.log(str);
    });
  };
  const req = http.request(options, callback);
  req.on('error', (e) => {
    console.error(e);
  });
  req.write(JSON.stringify({ name }));
  req.end();
};

const updateBook = (name) => {
  const callback = (response) => {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('end', () => {
      console.log(str);
    });
  };
  const req = http.request(options, callback);
  req.on('error', (e) => {
    console.error(e);
  });
  req.write(JSON.stringify({ name }));
  req.end();
};

switch (action) {
  case 'list':
    list();
    break;
  case 'read':
    options.path = `/books/${otherInfo[0]}`;
    read();
    break;
  case 'delete':
    options.method = 'DELETE';
    options.path = `/books/${otherInfo[0]}`;
    deleteBook();
    break;
  case 'create':
    options.method = 'POST';
    options.path = '/books';
    createBook(otherInfo[0]);
    break;
  case 'update':
    options.method = 'PATCH';
    options.path = `/books/${otherInfo[0]}`;
    updateBook(otherInfo[1]);
    break;
  default:
    break;
}
