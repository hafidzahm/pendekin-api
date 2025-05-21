const { where } = require("sequelize");
const { Site } = require("../models");
const redis = require("../helpers/ioredis");
const timeFormatLog = require("../helpers/timeFormatLog");
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
      console.log(`${req.protocol}://${req.get("host")}/r/${shorted_site}`);
      res.status(201).json({ results });
    } catch (error) {
      next(error);
    }
  }

  static async redirectLink(req, res, next) {
    try {
      const { linkSlug } = req.params;

      // Check if the original link exists in Redis
      const originalLinkFromRedis = await redis.get(linkSlug);
      if (originalLinkFromRedis) {
        console.log(`${linkSlug} -> ${originalLinkFromRedis}`);
        console.log(`===FETCHING FROM REDIS=== | ${timeFormatLog()}`);

        // redirect;
        res.status(308).redirect(originalLinkFromRedis);
        //add counter
        await SiteController.findSlugAndAddCounter(linkSlug);
        return;
      } else {
        // If not found in Redis, fetch from the database
        const slugData = await SiteController.findSlugAndAddCounter(linkSlug);

        if (slugData && slugData.original_site) {
          const { original_site } = slugData;
          console.log(`${linkSlug} -> ${original_site}`);
          console.log(`===FETCHING FROM DB=== | ${timeFormatLog()}`);

          // Save the original site to Redis for future requests
          await redis.set(linkSlug, original_site);
          redis.expire(linkSlug, 172800);
          console.log(`${linkSlug} | ${original_site} saved to Redis`);

          // Redirect to the original link
          return res.status(308).redirect(original_site);
        } else {
          // If the slug is not found, throw an error
          throw { name: "Not Found", message: "Link not found" };
        }
      }
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  }

  static async findSlugAndAddCounter(linkSlug) {
    try {
      const findedLink = await Site.findOne({
        where: { shorted_site: linkSlug },
      });

      if (!findedLink) {
        throw { name: "Not Found", message: "Link not found" };
      }

      // Increment the click count and save
      findedLink.click_count += 1;
      await findedLink.save();
      console.log(findedLink.click_count, "<---count");

      return findedLink;
    } catch (error) {
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  static async getLinkByUserId(req, res, next) {
    try {
      const { id } = req.user;
      const findedLink = await Site.findAll({ where: { UserId: id } });
      console.log(findedLink);
      console.log(redis, "<----redis");
      return res.status(200).json({ findedLink });
    } catch (error) {
      next(error);
    }
  }

  static async deleteLinkBySlugLink(req, res, next) {
    try {
      const { linkSlug } = req.params;
      const originalLinkFromRedis = await redis.get(linkSlug);

      const findedSite = await Site.findOne({
        where: { shorted_site: linkSlug },
      });
      await findedSite.destroy();
      if (originalLinkFromRedis) {
        redis.del(linkSlug);
        console.log(`${linkSlug} deleted`);
      }
      return res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SiteController;
