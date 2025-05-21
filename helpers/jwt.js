require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
console.log(secret);
function createToken(plainWord) {
  const token = jwt.sign(plainWord, secret);
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, secret);
  return decoded;
}

module.exports = { createToken, verifyToken };
