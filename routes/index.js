var express = require('express');
var router = express.Router();
var getKeyStore = require('../jwt/keyStore.js').getKeyStore;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({hello: "world!"});
});


router.get('/.well-known/jwks.json', async function(req, res) {
  console.log(getKeyStore);
  var keys = await getKeyStore();
  res.json(keys.toJSON());
//  res.json(keystore.toJSON());
});


module.exports = router;
