const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/products', controllers.queryProducts);
router.get('/products/:product_id', controllers.queryProductId);
router.get('/products/:product_id/related', controllers.queryRelatedProducts);
router.get('/products/:product_id/styles', controllers.queryProductStyles);

module.exports = router;
