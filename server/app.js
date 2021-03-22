const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes.js');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(port);
console.log(`listening on http://localhost/${port}/products `);
