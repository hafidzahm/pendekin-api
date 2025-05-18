const express = require("express");
const UserController = require("./controllers/UserController");
const errorHandler = require("./middlewares/errorHandler");
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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
