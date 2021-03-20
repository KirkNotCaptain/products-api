const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db;
let productsCollection;
let styleCollection;

MongoClient.connect(url, { useUnifiedTopology: true }) //
  .then((client) => {
    db = client.db('productsAPI');
    productsCollection = db.collection('products');
    styleCollection = db.collection('styles');
  })
  .catch((err) => {
    console.error(err);
  });

/*=========================================================================
  =                         Product Information                      =
     Returns all product level information for a specified product id.
  =========================================================================*/
var queryProducts = (req, res) => {
  var page = Number(req.query.page) || 1;
  var count = Number(req.query.count) || 5;
  var limit = page * count;

  productsCollection
    .find({})
    .sort({ id: 1 })
    .limit(limit)
    .toArray()
    .then((docs) => {
      res.status(200).send(docs);
    });
};

/*=========================================================================
  =                         Product Information                      =
     Returns all product level information for a specified product id.
  =========================================================================*/
var queryProductId = (req, res) => {
  let id = Number(req.params.product_id);
  productsCollection.findOne({ id }).then((docs) => {
    res.status(200).send(docs);
  });
};

/*=========================================================================
  =                         Related Products                      =
      Returns the id's of products related to the product specified.
  =========================================================================*/

var queryRelatedProducts = (req, res) => {
  let id = Number(req.params.product_id);
  productsCollection.findOne({ id }).then((docs) => {
    var relatedProducts = docs['related'];
    res.status(200).send(relatedProducts);
  });
};

module.exports = {
  queryProducts: queryProducts,
  queryProductId: queryProductId,
  queryRelatedProducts: queryRelatedProducts,
};
