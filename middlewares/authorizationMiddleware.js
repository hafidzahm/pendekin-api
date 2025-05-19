const { where } = require("sequelize");
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const timeFormatLog = require("../helpers/timeFormatLog");

async function authorizationMiddleware(req, res, next) {
  try {
    console.log("---AUTHORIZATION MIDDLEWARE---");
    const timeLog = timeFormatLog();
    //cek headers auth
    const { authorization } = req.headers;
    // kalo headers auth gaada
    if (!authorization) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }
    //kalo ada cek bearer dan token
    // console.log(authorization.split(" "));
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !bearer || !token) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    // kalo ada keduanya cek token
    const verify = verifyToken(token);
    console.log(verify.email, `<=== user login at ${timeLog} ===`);

    // cek user ada ga?
    const findedUser = await User.findOne({ where: { email: verify.email } });
    // kalo gaada usernya?
    if (!findedUser) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }
    // kalo ada simpen di req.user
    req.user = {
      email: verify.email,
    };
    // console.log(req.user, "< ----- req.user");
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorizationMiddleware;
