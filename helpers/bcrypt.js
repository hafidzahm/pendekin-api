const bcrypt = require("bcryptjs");

function createHash(plainKey) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainKey, salt);
  return hash;
}

function compareHash(plainKey, hashedKey) {
  return bcrypt.compareSync(plainKey, hashedKey);
}

module.exports = { createHash, compareHash };
