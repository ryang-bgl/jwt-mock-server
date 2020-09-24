var express = require('express');
var router = express.Router();
var getKeyStore = require('../jwt/keyStore.js').getKeyStore;
var jose = require('node-jose');

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

router.post('/token', async function(req, res) {
  var keys = await getKeyStore();
  var key = keys.all()[0];
  var token = await new Promise((resolve) => {
    jose.JWS.createSign({ alg: 'RS256', format: 'compact' }, key).
      update(JSON.stringify(req.body)).
      final().
      then(function(result) {
        resolve(result);
      });

  });
  res.json({token: token});
});


module.exports = router;
