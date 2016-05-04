// Manual encoding

// need to install crypto in order to us it
var crypto = require("crypto");

// this encryp/encode the token
exports.encode = function(payload, secret) {
    algorithm = "HS256";

    var header = {
        typ: "JWT",
        alg: algorithm
    };

    var jwt = base64Encode(JSON.stringify(header)) + "." + base64Encode(JSON.stringify(payload));

    // the signature is encoded with the header and payload
    return jwt + "." + sing(jwt, secret);
};

// this decode/unencryp the token
exports.decode = function (token, secret) {
  var segments = token.split(".");
  if (segments.length !== 3) {
    throw new Error("Token structure incorrect");
  }
  var header = JSON.parse(base64Decode(segments[0]));
  var payload = JSON.parse(base64Decode(segments[1]));

  var rawSignature = segments[0] + "." + segments[1];

  if (!verify(signature, secret, segments[2])) {
    throw new Error("Verification failed");
  }

  return payload;
};

function verify(raw, secret, signature) {
  return signature === sing(raw, secret);
}

// this is the function that generate the signature
function sing(str, key) {
  return crypto.createHmac("sha256", key).update(str).digest("base64");
}

// turn it in to a bit 64
function base64Encode(str) {
  return new Buffer(str).toString("base64");
}

// turn back to normal
function base64Decode(str) {
  return new Buffer(str, "base64").toString();
}
