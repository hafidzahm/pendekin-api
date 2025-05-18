const jwt = require("jsonwebtoken");
function createToken(plainWord) {
  const token = jwt.sign(plainWord, "rahasiaaa");
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, "rahasiaaa");
  return decoded;
}

module.exports = { createToken, verifyToken };
