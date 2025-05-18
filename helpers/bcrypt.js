const bcrypt = require("bcryptjs");

export function createHash(plainKey) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainKey, salt);
  return hash;
}

export function compareHash(plainKey, hashedKey) {
  return bcrypt.compareSync(plainKey, hashedKey);
}
