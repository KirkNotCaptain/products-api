const router = require('express').Router();
const controllers = require('./controllers.js');
const cache = require('./cache-middleware');

router.get('/', (req, res) => {
  res.send('welcome to the Atelier Products Api');
});
router.get('/loaderio-90a3c4ad2b582992ef96fbef198e7915', (req, res) => {
  res.send('loaderio-90a3c4ad2b582992ef96fbef198e7915');
});

router.get('/products', cache.productsCache, controllers.queryProducts);

router.get(
  '/products/:product_id',
  cache.productIdCache,
  controllers.queryProductId
);
router.get(
  '/products/:product_id/related',
  cache.relatedCache,
  controllers.queryRelatedProducts
);
router.get(
  '/products/:product_id/styles',
  cache.styleCache,
  controllers.queryProductStyles
);

module.exports = router;
