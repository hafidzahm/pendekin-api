const express = require("express");
const UserController = require("./controllers/UserController");
const errorHandler = require("./middlewares/errorHandler");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Shortener API",
  });
});
app.post("/users", UserController.registerUser);
app.post("/login", UserController.loginUser);
app.use(authorizationMiddleware);
app.get("/test", (req, res) => {
  res.json({
    message: "Middleware auth",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
