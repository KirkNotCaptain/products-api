//TODO: Import controllers
const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let db;
let collection;

MongoClient.connect(url, { useUnifiedTopology: true }) //
  .then((client) => {
    db = client.db('productsAPI');
    collection = db.collection('products');
  })
  .catch((err) => {
    console.error(err);
  });

router.get('/', (req, res) => {
  collection.findOne({ id: 1 }).then((docs) => {
    res.send(docs);
  });
});

module.exports = router;
//TODO: router.get for products/:product_id
//TODO: router.get for products/:product_id/styles
//TODO: router.get for products/:product_id/related
