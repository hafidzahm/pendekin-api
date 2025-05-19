const timeFormatLog = require("../helpers/timeFormatLog");
const { Site } = require("../models");
async function authorizationMiddleware(req, res, next) {
  try {
    console.log(
      `==========AUTHORIZATION MIDDLEWARE========== | ${timeFormatLog()} `
    );
    const userLoginId = req.user.id;
    const { linkId } = req.params;
    const findedLink = await Site.findOne({ where: { id: linkId } });
    if (!findedLink) {
      throw { name: "Not Found", message: "Link not found" };
    }

    console.log(findedLink);

    const userIdFromLink = findedLink.userId;
    if (userLoginId !== userIdFromLink) {
      throw { name: "Forbidden", message: "Forbidden access" };
    }

    next();
  } catch (error) {
    next(error);
  }
}
module.exports = authorizationMiddleware;
