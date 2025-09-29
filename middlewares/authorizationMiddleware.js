const timeFormatLog = require("../helpers/timeFormatLog");
const { Site } = require("../models");
async function authorizationMiddleware(req, res, next) {
  try {
    console.log(
      `==========AUTHORIZATION MIDDLEWARE========== | ${timeFormatLog()} `
    );
    const userLoginId = req.user.id;
    const { linkSlug } = req.params;
    const findedLink = await Site.findOne({
      where: { shorted_site: linkSlug },
    });
    if (!findedLink) {
      throw { name: "Not Found", message: "Link not found" };
    }

    console.log(findedLink);

    const userIdFromLink = findedLink.UserId;
    console.log(userLoginId, userIdFromLink, "<---comparison ID");

    if (userLoginId !== userIdFromLink) {
      throw { name: "Forbidden", message: "Forbidden access" };
    }

    next();
  } catch (error) {
    next(error);
  }
}
module.exports = authorizationMiddleware;
