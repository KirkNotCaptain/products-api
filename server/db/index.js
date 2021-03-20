const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'productsAPI';
const client = new MongoClient(url, { useUnifiedTopology: true });

var queryProductId = () => {
  return new Promise((resolve, reject) => {
    client.connect((err) => {
      const db = client.db(dbName);
      const collection = db.collection('products');

      if (err) {
        reject(err);
      }
      console.log('Connected successfully to mongo');

      //fetch data
      collection.findOne({ id: 1 }, (err, docs) => {
        // console.log('found the following record:');
        // console.log(docs);
        // client.close();
        resolve(docs);
      });
    });
  });
};

module.exports = queryProductId;
