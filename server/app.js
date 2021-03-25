const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes.js');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(PORT);
console.log(`listening on http://localhost/${PORT}/products `);
