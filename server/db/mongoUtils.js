const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// let db;
// let collection;

module.exports = {
  connectToDb: () => {
    MongoClient.connect(url, { useUnifiedTopology: true })
      .then((client) => {
        var db = client.db('productsAPI');
        var collection = db.collection('products');
      })
      .catch((err) => {
        console.error(err);
      });
  },
  findOneProduct: (req, res, coll) => {
    coll
      .findOne({ id: 1 }) //
      .then((docs) => {
        res.send(docs);
      });
  },
};
