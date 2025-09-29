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
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (error.name === "Not Found") {
    return res.status(404).json({ message: error.message });
  }
  if (error.name === "Forbidden") {
    return res.status(403).json({ message: error.message });
  }

  return res.status(500).json({ message: "Internal server error" });
}

module.exports = errorHandler;
