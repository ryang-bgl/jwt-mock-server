## A JWT mock server for local development

### Run

default port 9000
```shell
npx --package github:ruiyang/jwt-mock-server start
```

to run in a different port 3000
```shell
PORT=3000 npx --package github:ruiyang/jwt-mock-server start
```

### endpoints

```shell
curl --location --request GET 'localhost:9000/jwt/.well-known/jwks.json'
```

get a jwt token and pass claims in post body
```shell
curl --location --request POST 'localhost:9000/jwt/token' \
--header 'Content-Type: application/json' \
--data-raw '{"username": "user1@test.com"}'
```

get a jwt using get and pass claims in query params:
```shell
curl --location --request GET 'localhost:9000/jwt/token?username=abc@test.com.au&authorities=AUTH_WP&authorities=AUTH_WP2' \
--header 'Content-Type: application/json'
```

shutdown the server gracefully
```shell
curl --location --request GET 'localhost:9000/shutdown'
```
