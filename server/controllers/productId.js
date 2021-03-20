//controller: map route to models
const mongoUtil = require('../db/mongoUtils.js');
var db = mongoUtil.getDb();

var findOneProduct = () => {
  mongoUtil.connectToServer((err, client) => {
    if (err) {
      console.log(err);
    }
  });

  return new Promise((resolve, reject) => {
    db.collection('products').findOne({ id: 1 }, (err, docs) => {
      console.log('found the following record: ');
      console.log(docs);
      resolve(docs);
    });
  });
};

module.exports = findOneProduct;
