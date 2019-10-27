const CubejsServer = require("@cubejs-backend/server");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const jwks = JSON.parse(fs.readFileSync("jwks.json"));
const _ = require("lodash");

const server = new CubejsServer({
  checkAuth: async (req, auth) => {
    const decoded = jwt.decode(auth, { complete: true });
    const jwk = _.find(jwks.keys, x => x.kid === decoded.header.kid);
    const pem = jwkToPem(jwk);
    req.authInfo = jwt.verify(auth, pem);
  }
});

server.listen().then(({ port }) => {
  console.log(`🚀 Cube.js server is listening on ${port}`);
});