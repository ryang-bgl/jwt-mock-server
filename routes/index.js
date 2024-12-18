var express = require('express');
var router = express.Router();
var getKeyStore = require('../jwt/keyStore.js').getKeyStore;
var jose = require('node-jose');

const DEFAULT_CLAIMS = JSON.parse(getCommandLineArg("--claims", '{"username": "test@test.com", "userId": 1, "authorities": ["AUTH_1"]}'));
if (typeof DEFAULT_CLAIMS !== 'object') {
    throw new Error('Invalid default claims');
}
const TOKEN_EXPIRY = Number.parseInt(getCommandLineArg("--token-expiry", 3600));
if (Number.isNaN(TOKEN_EXPIRY)) {
    throw new Error('Invalid token expiry');
}

router.get('/', function(req, res, next) {
  res.json({hello: "world!"});
});

router.get('/shutdown', function(req, res, next) {
  res.json({hello: "world!"});
});

router.get('/.well-known/jwks.json', async function(req, res) {
  var keys = await getKeyStore();
  res.json(keys.toJSON());
});

router.post('/token', async function(req, res) {
  var keys = await getKeyStore();
  var key = keys.all()[0];
  var body = req.body;
  body["iat"] = Math.floor(Date.now() / 1000);
  body["exp"] = Math.floor(Date.now() / 1000) + TOKEN_EXPIRY;
  var token = await new Promise((resolve) => {
    jose.JWS.createSign({ alg: 'RS256', format: 'compact' }, key)
      .update(JSON.stringify(req.body))
      .final()
      .then(function(result) {
        resolve(result);
      });

  });
  res.json({token: token});
});

function getCommandLineArg(flag, defaultValue) {
  const index = process.argv.indexOf(flag);
  if (index >= 0) {
    if (process.argv.length <= index + 1) {
      throw new Error(`Missing value for ${flag}`);
    }
    return process.argv[index + 1];
  }
  return defaultValue;
}

// router.options('/token', async function(req, res) {
//   console.log("============options")
//   var body = 'GET, POST, DELETE, PUT, PATCH';
//   res.set('Allow', body);
//   res.send(body);
// });

router.get('/token', async function(req, res) {
  var keys = await getKeyStore();
  var key = keys.all()[0];
  var body = Object.keys(req.query).length > 0 ? req.query : DEFAULT_CLAIMS;

  body["iat"] = Math.floor(Date.now() / 1000);
  body["exp"] = Math.floor(Date.now() / 1000) + TOKEN_EXPIRY;

  var token = await new Promise((resolve) => {
    jose.JWS.createSign({ alg: 'RS256', format: 'compact' }, key)
      .update(JSON.stringify(body))
      .final()
      .then(function(result) {
        resolve(result);
      });

  });
  res.json({token: token});
});


module.exports = router;
