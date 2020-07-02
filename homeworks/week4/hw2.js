const http = require('http');

const args = process.argv;
const action = args[2];
const otherInfo = args.slice(3);

const list = () => {
  const options = {
    method: 'get',
    host: 'lidemy-book-store.herokuapp.com',
    path: '/books?_limit=20',
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
};

const read = (id) => {
  const options = {
    method: 'get',
    host: 'lidemy-book-store.herokuapp.com',
    path: `/books/${id}`,
  };
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
  http.request(options, callback).end();
};

const deleteBook = (id) => {
  const options = {
    method: 'delete',
    host: 'lidemy-book-store.herokuapp.com',
    path: `/books/${id}`,
  };
  const callback = (response) => {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('end', () => {
      console.log(str);
    });
  };
  http.request(options, callback).end();
};

const createBook = (name) => {
  const options = {
    method: 'post',
    host: 'lidemy-book-store.herokuapp.com',
    path: '/books',
    headers: {
      'Content-Type': 'application/json',
    },
  };
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

  req.write(JSON.stringify({ name }));
  req.end();
};

const updateBook = (id, name) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    host: 'lidemy-book-store.herokuapp.com',
    path: `/books/${id}`,
  };
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

  req.write(JSON.stringify({ name }));
  req.end();
};

switch (action) {
  case 'list':
    list();
    break;
  case 'read':
    read(...otherInfo);
    break;
  case 'delete':
    deleteBook(...otherInfo);
    break;
  case 'create':
    createBook(...otherInfo);
    break;
  case 'update':
    updateBook(...otherInfo);
    break;
  default:
    break;
}
