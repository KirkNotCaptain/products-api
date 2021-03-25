const redis = require('redis');
const REDIS_PORT = 6379;
const redisClient = redis.createClient(REDIS_PORT);

/**
 * Redis cache middleware intercepting requests to /products
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express middleware next function
 */
const productsCache = (req, res, next) => {
  let page = Number(req.query.page) || 1;
  let count = Number(req.query.count) || 5;
  let limit = page * count;

  redisClient.get(limit, (err, data) => {
    if (err) throw err;

    if (data) {
      res.status(200).send(JSON.parse(data));
    } else {
      next();
    }
  });
};

/**
 * Redis cache middleware intercepting requests to /products/:product_id
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express middleware next function
 */
const productIdCache = (req, res, next) => {
  let id = Number(req.params.product_id);

  redisClient.get(`product${id}`, (err, data) => {
    if (err) throw err;
    if (data) {
      res.status(200).send(JSON.parse(data));
    } else {
      next();
    }
  });
};

/**
 * Redis cache middleware intercepting requests to /products/:product_id/related
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express middleware next function
 */
const relatedCache = (req, res, next) => {
  let id = Number(req.params.product_id);

  redisClient.get(`related${id}`, (err, docs) => {
    if (err) throw err;
    if (docs) {
      console.log('found in redis');
      res.status(200).send(JSON.parse(docs));
    } else {
      next();
    }
  });
};

/**
 * Redis cache middleware intercepting requests to /products/:product_id/styles
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express middleware next function
 */
const styleCache = (req, res, next) => {
  let id = Number(req.params.product_id);

  redisClient.get(`style${id}`, (err, docs) => {
    if (err) throw err;

    if (docs) {
      console.log('found in redis');
      res.status(200).send(JSON.parse(docs));
    } else {
      next();
    }
  });
};

module.exports = {
  productsCache: productsCache,
  productIdCache: productIdCache,
  relatedCache: relatedCache,
  styleCache: styleCache,
};
