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

//Query: Product By Id:
var queryProductId = (req, res) => {
  collection.findOne({ id: 1 }).then((docs) => {
    console.log('success!');
    res.send(docs);
  });
};

module.exports = {
  queryProductId: queryProductId,
};
