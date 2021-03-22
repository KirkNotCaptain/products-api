const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db;
let productsCollection;
let stylesCollection;
let skuCollection;

MongoClient.connect(url, { useUnifiedTopology: true }) //
  .then((client) => {
    db = client.db('productsAPI');
    productsCollection = db.collection('products');
    stylesCollection = db.collection('styles');
    skuCollection = db.collection('skus');
  })
  .catch((err) => {
    console.error(err);
  });

/*=========================================================================
  =                         List Product                            =
                  Retrieves the list of products
  =========================================================================*/
let queryProducts = (req, res) => {
  let page = Number(req.query.page) || 1;
  let count = Number(req.query.count) || 5;
  let limit = page * count;

  productsCollection
    .find({})
    .project({
      _id: 0,
      features: 0,
      related: 0,
    })
    .sort({ id: 1 })
    .limit(limit)
    .toArray()
    .then((docs) => {
      console.log(docs);
      if (!docs) {
        res.status(200).send({});
        return;
      }

      res.status(200).send(docs);
    });
};

/*=========================================================================
  =                         Product Information                      =
     Returns all product level information for a specified product id.
  =========================================================================*/
let queryProductId = (req, res) => {
  let id = Number(req.params.product_id);
  productsCollection
    .findOne({ id }, { projection: { _id: false } })
    .then((docs) => {
      if (!docs) {
        res.status(200).send({});
        return;
      }
      res.status(200).send(docs);
    });
};

/*=========================================================================
  =                         Related Products                      =
      Returns the id's of products related to the product specified.
  =========================================================================*/
let queryRelatedProducts = (req, res) => {
  let id = Number(req.params.product_id);

  productsCollection
    .findOne({ id }, { projection: { _id: false, related: true } })
    .then((docs) => {
      if (!docs) {
        res.status(200).send({});
        return;
      }
      res.status(200).send(docs['related']);
    });
};

/*=========================================================================
=                         Product Styles                        =
      Returns the all styles available for the given product.
=========================================================================*/
let queryProductStyles = (req, res) => {
  console.log(req.params);
  let product_id = Number(req.params.product_id);
  let response = {};

  return new Promise((resolve, reject) => {
    stylesCollection.findOne({ product_id }).then((styleDocs) => {
      if (!styleDocs) {
        res.status(200).send({});
        return;
      }
      response = {
        product_id: styleDocs['product_id'],
        results: styleDocs['results'],
      };
      resolve(response);
    });
  }).then((response) => {
    skuCollection.findOne({ _id: product_id }).then((skuDocs) => {
      if (!skuDocs) {
        res.status(200).send({});
        return;
      }
      let skus = {};

      skuDocs['skus'].forEach((sku) => {
        skus[sku['id']] = {
          size: sku['size'],
          quantity: sku['quantity'],
        };
      });

      response.results.forEach((result) => {
        if (result['sale_price'] === 'null') {
          result['sale_price'] = null;
        }
        result['default?']
          ? (result['default?'] = true)
          : (result['default?'] = false);
        result['skus'] = skus;
      });

      res.status(200).send(response);
    });
  });
};

module.exports = {
  queryProducts: queryProducts,
  queryProductId: queryProductId,
  queryRelatedProducts: queryRelatedProducts,
  queryProductStyles: queryProductStyles,
};
