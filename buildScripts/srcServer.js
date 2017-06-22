import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev'

/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function (request, response) {
  response.json([
    { "id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@example.com" },
    { "id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@example.com" },
    { "id": 3, "firstName": "Tina", "lastName": "Lee", "email": "lee.tina@example.com" },
  ]);
});

const port = 3000;

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    open('http://localhost:' + port);
  }
});
