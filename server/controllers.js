const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://mongo:27017';
let db;
let productsCollection;
let stylesCollection;
let skuCollection;

MongoClient.connect(url, { useUnifiedTopology: true }) //
  .then((client) => {
    console.log('connected to mongo db');
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
                            Parameters:
     page - int - Selects the page of results to return. Default 1.
     count - int = Specifies how many results per page to return. Default 5.
  =========================================================================*/
let queryProducts = (req, res) => {
  // console.log(productsCollection);
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
                              Parameters:
          product_id - int - Required ID of the Product requested
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
                            Parameters:
        product_id - int - Required ID of the Product requested
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
                          Parameters:
      product_id - int - Required ID of the Product requested
=========================================================================*/
let queryProductStyles = (req, res) => {
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

// let queryProductStyles = (req, res) => {
//   let product_id = Number(req.params.product_id);
//   let response = {};

//   return new Promise((resolve, reject) => {
//     stylesCollection
//       .findOne({ product_id }, { projection: { _id: false } })
//       .then((styleDocs) => {
//         if (!styleDocs) {
//           res.status(200).send({});
//           return;
//         }
//         resolve(styleDocs);
//       });
//   }).then((styleDocs) => {
//     skuCollection
//       .findOne({ _id: product_id }, { projection: { _id: false } })
//       .then((skuDocs) => {
//         if (!skuDocs) {
//           res.status(200).send({});
//         }
//         styleDocs['results'].forEach((style) => {
//           if (style['sale_price'] === 'null') {
//             style['sale_price'] = null;
//           }
//           style['default?']
//             ? (style['default?'] = true)
//             : (style['default?'] = false);
//           style['skus'] = skuDocs.skus;
//         });
//         res.status(200).send(styleDocs);
//       });
//   });
// };

module.exports = {
  queryProducts: queryProducts,
  queryProductId: queryProductId,
  queryRelatedProducts: queryRelatedProducts,
  queryProductStyles: queryProductStyles,
};
