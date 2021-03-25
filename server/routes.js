const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/', (req, res) => {
  res.send('welcome to the products api');
});
router.get('/loaderio-ebbc3b3c895f6ba370e446f98015309e', (req, res) => {
  res.send('loaderio-ebbc3b3c895f6ba370e446f98015309e');
});
router.get('/products', controllers.queryProducts);
router.get('/products/:product_id', controllers.queryProductId);
router.get('/products/:product_id/related', controllers.queryRelatedProducts);
router.get('/products/:product_id/styles', controllers.queryProductStyles);

module.exports = router;
