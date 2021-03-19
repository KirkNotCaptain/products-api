const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const queryProductId = require('../db/index.js');

app.use(cors());
app.get('/', (req, res) => {
  queryProductId().then((docs) => {
    res.send(docs);
  });
});

app.listen(port);
console.log('listening on port: ', port);
