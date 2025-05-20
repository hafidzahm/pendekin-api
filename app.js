if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const UserController = require("./controllers/UserController");
const errorHandler = require("./middlewares/errorHandler");
const SiteController = require("./controllers/SiteController");
const authenticationMiddleware = require("./middlewares/authenticationMiddleware");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Shortener API (pendekin API)",
    repo: "https://github.com/hafidzahm/pendekin-api",
    postman_docs: "https://pendekin-api.hafizh.web.id/r/pendekin-postman-docs",
  });
});
app.post("/api/users", UserController.registerUser);
app.post("/api/login", UserController.loginUser);
app.get("/r/:shortId", SiteController.redirectLink);
// ===============
app.use(authenticationMiddleware);
app.post("/api/test", (req, res) => {
  res.json({
    message: "Middleware auth",
  });
});
app.post("/api/shorts", SiteController.createShorterLink);
// getAllLink by user login
app.get("/api/links", SiteController.getLinkByUserId);
// delete link by user login (need middleware)
app.delete(
  "/api/link/:linkSlug",
  authorizationMiddleware,
  SiteController.deleteLinkBySlugLink
);
// ================
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
