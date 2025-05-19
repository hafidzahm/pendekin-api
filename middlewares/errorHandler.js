function errorHandler(error, req, res, next) {
  console.log(error, "<--- errorHandler");
  // console.log(error.errors[0].message, "<--- MESSAGE");
  console.log(error.name, "<--- errorname");
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    return res.status(400).json({ message: error.errors[0].message });
  }

  if (error.name === "Bad Request") {
    return res.status(400).json({ message: error.message });
  }
  if (error.name === "Unauthorized") {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = errorHandler;
