const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'productsAPI';
const client = new MongoClient(url, { useUnifiedTopology: true });

// var fetchProductById = (db) => {
//   const collection = db.collection('products');

//   return new Promise((resolve, reject) => {
//     collection.findOne({ id: 1 }, (err, docs) => {
//       if (err) {
//         reject(err);
//       }
//       console.log('found the following record:');
//       console.log(docs);
//       resolve(docs);
//     });
//   });
// };

// client.connect(function (err) {
//   assert.equal(null, err);
//   console.log('Connected successfully to server');

//   const db = client.db(dbName);

//   fetchProductById(db).then((docs) => {
//     client.close();
//   });
// });
// const collection = db.collection('products');

var queryProductId = () => {
  return new Promise((resolve, reject) => {
    client.connect((err) => {
      const db = client.db(dbName);
      const collection = db.collection('products');

      if (err) {
        reject(err);
      }
      console.log('Connected successfully to server');

      //fetch data
      collection.findOne({ id: 1 }, (err, docs) => {
        console.log('found the following record:');
        console.log(docs);
        resolve(docs);
      });
    });
  });
};

module.exports = queryProductId;

// var fetchProductById = (db) => {
//   // const collection = db.collection('products');

//   return new Promise((resolve, reject) => {
//     collection.findOne({ id: 1 }, (err, docs) => {
//       if (err) {
//         reject(err);
//       }
//       console.log('found the following record:');
//       console.log(docs);
//       resolve(docs);
//     });
//   });
// };

// client.connect(function (err) {
//   assert.equal(null, err);
//   console.log('Connected successfully to server');

//   const db = client.db(dbName);

//   fetchProductById(db).then((docs) => {
//     client.close();
//   });
// });
