const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/products', controllers.queryProducts);
router.get('/products/:product_id', controllers.queryProductId);
router.get('/products/:product_id/related', controllers.queryRelatedProducts);

module.exports = router;
//TODO: router.get for products/:product_id
//TODO: router.get for products/:product_id/styles
//TODO: router.get for products/:product_id/related
