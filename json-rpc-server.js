const axios = require('axios');
const { appendFile } = require('fs');
const app = require('express')();
const bodyParser = require('body-parser');
const jsonRouter = require('express-json-rpc-router');

const formatData = (data, id = '') => `${id}: ${Date.now()}: ${JSON.stringify(data)}\n`;

const controller = {
  async getUser({ id }) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    return response.data;
  },

  async getPost({ id }) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

    return response.data;
  },

  async getPhoto({ id }) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);

    return response.data;
  },
};

const beforeController = {
  getUser({ id }) {
    if (id <= 0 || id > 10) {
      throw new Error('ERROR: getUser id should be between 1 and 10');
    }
  },

  getPost({ id }) {
    if (id <= 0 || id > 100) {
      throw new Error('ERROR: getPost id should be between 1 and 100');
    }
  },

  getPhoto({ id }) {
    if (id <= 0 || id > 5000) {
      throw new Error('ERROR: getPost id should be between 1 and 5000');
    }
  }
};

const afterController = {
  getUser({ id }, execResult) {
    appendFile('users.log', formatData(execResult, id), (err) => {
      if (err) {
        throw err;
      }

      console.log('inserted user');
    });
  },

  getPost({ id }, execResult) {
    appendFile('posts.log', formatData(execResult, id), (err) => {
      if (err) {
        throw err;
      }

      console.log('inserted post');
    });
  },

  getPhoto({ id }, execResult) {
    appendFile('photos.log', formatData(execResult, id), (err) => {
      if (err) {
        throw err;
      }

      console.log('inserted photo');
    });
  },
};

app.use(bodyParser.json());
app.use(jsonRouter({
  methods: controller,
  beforeMethods: beforeController,
  afterMethods: afterController,
  onError(e) {
    console.error('Omg error occurred!', e);
  },
}));

app.listen(3000, () => console.log('Server listening on port: 3000'));
