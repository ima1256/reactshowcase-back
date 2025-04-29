// const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secret = "a-string-secret-at-least-256-bits-long";
// const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

// console.log("JWT:", token);

function base64urlEncode(obj) {
  return Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/=/g, "") // Remove padding
    .replace(/\+/g, "-") // Replace '+' with '-'
    .replace(/\//g, "_"); // Replace '/' with '_'
}

const header = {
  alg: "HS256",
  typ: "JWT",
};

const user = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};

const encodedHeader = base64urlEncode(header)
const encodedUser = base64urlEncode(user)

const data = `${encodedHeader}.${encodedUser}`

const signature = crypto
  .createHmac('sha256', secret)
  .update(data)
  .digest('base64')
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');



// // Step 1: Convert the object to a JSON string
// const jsonStr = JSON.stringify(obj);

// // Step 2: Encode to Base64
// const base64 = Buffer.from(jsonStr).toString("base64");

// let encodedUser = Buffer.from(JSON.stringify(user2)).toString("base64");

// console.log("Base64 Encoded:", base64);
// console.log("Base64 encoded user: ", encodedUser);
// console.log("Secret", Buffer.from("a-string-secret-at-least-256-bits-long").toString("base64"))

const jwt = `${encodedHeader}.${encodedUser}.${signature}`

console.log(jwt)
