const jwt = require("jsonwebtoken");
export function createToken(plainWord) {
  const token = jwt.sign(plainWord, "rahasiaaa");
  return token;
}

export function verifyToken(token) {
  const decoded = jwt.verify(token, "rahasiaaa");
  return decoded;
}
