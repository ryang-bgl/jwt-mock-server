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

```shell
curl --location --request POST 'localhost:9000/jwt/token' \
--header 'Content-Type: application/json' \
--data-raw '{"username": "user1@test.com"}'
```

shutdown the server gracefully
```shell
curl --location --request GET 'localhost:9000/shutdown'
```
