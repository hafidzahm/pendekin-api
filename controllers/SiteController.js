const { where } = require("sequelize");
const { Site } = require("../models");
class SiteController {
  static async createShorterLink(req, res, next) {
    try {
      const { id } = req.user;
      const { shorted_site, original_site } = req.body;
      const results = await Site.create({
        UserId: id,
        shorted_site,
        original_site,
      });
      console.log(results);
      console.log(`${req.protocol}://${req.get("host")}/${shorted_site}`);
      res.status(201).json({ results });
    } catch (error) {
      next(error);
    }
  }

  static async redirectLink(req, res, next) {
    try {
      const { shortId } = req.params;
      const findedLink = await Site.findOne({
        where: { shorted_site: shortId },
      });
      console.log(findedLink);
      if (!findedLink) {
        throw { name: "Not Found", message: "Link not found" };
      }
      //kalo ada redirect ke original link
      const { original_site } = findedLink;
      findedLink.click_count += 1;
      await findedLink.save();
      return res.status(308).redirect(original_site);
    } catch (error) {
      next(error);
    }
  }

  static async getLinkByUserId(req, res, next) {
    try {
      const { id } = req.user;
      const findedLink = await Site.findAll({ where: { UserId: id } });
      console.log(findedLink);
      return res.status(200).json({ findedLink });
    } catch (error) {
      next(error);
    }
  }

  static async deleteLinkById(req, res, next) {
    try {
      const { linkId } = req.params;
      const findedSite = await Site.findOne({ where: { id: linkId } });
      console.log(findedSite);
      await findedSite.destroy();
      return res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SiteController;
