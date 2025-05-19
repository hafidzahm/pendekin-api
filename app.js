const express = require("express");
const UserController = require("./controllers/UserController");
const errorHandler = require("./middlewares/errorHandler");
const SiteController = require("./controllers/SiteController");
const authenticationMiddleware = require("./middlewares/authenticationMiddleware");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Shortener API (pendekin API)",
    docs: "https://github.com/hafidzahm/pendekin-api",
  });
});
app.post("/users", UserController.registerUser);
app.post("/login", UserController.loginUser);
app.get("/redirect/:shortId", SiteController.redirectLink);
// ===============
app.use(authenticationMiddleware);
app.post("/test", (req, res) => {
  res.json({
    message: "Middleware auth",
  });
});
app.post("/shorts", SiteController.createShorterLink);
// getAllLink by user login
app.get("/links", SiteController.getLinkByUserId);
// delete link by user login (need middleware)
app.delete(
  "/link/:linkId",
  authorizationMiddleware,
  SiteController.deleteLinkById
);
// ================
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
