var jose = require('node-jose');

var keystore = jose.JWK.createKeyStore();

function getKeyStore() {
  console.log(keystore.all().length);
  console.log(keystore.all[0]);
  if (keystore.all().length == 0) {
    return keystore.generate("RSA", 2048, {alg:"RS256", key_ops:["sign", "decrypt", "unwrap"]}).
      then(function(result) {
        // {result} is a jose.JWK.Key
        key = result;
      }).then((k) => {
//        keystore.add(k);
        return keystore.generate("RSA", 2048, {alg:"RS256", key_ops:["sign", "decrypt", "unwrap"]})
      }).then((k) => {
//        keystore.add(k);
        return keystore;
      });
  } else {
    return Promise.resolve(keystore);
  }
}

module.exports = {getKeyStore: getKeyStore};
