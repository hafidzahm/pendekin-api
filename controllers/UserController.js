const { compareSync } = require("bcryptjs");
const { User } = require("../models");
const { createToken } = require("../helpers/jwt");
const timeFormatLog = require("../helpers/timeFormatLog");
class UserController {
  static async registerUser(req, res, next) {
    try {
      //   console.log(req.body);
      const { name, email, password } = req.body;
      //   console.log(User);
      const user = await User.create({ name, email, password });
      console.log(
        `=== User with email ${user.email} created at ${timeFormatLog()} ===`
      );
      return await res.status(201).json({
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      //   console.log(error);
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Bad Request", message: "Email required" };
      }
      if (!password) {
        throw { name: "Bad Request", message: "Password required" };
      }

      //kalo keduanya ada, cari user lewat email
      const findedUser = await User.findOne({ where: { email } });

      //kalo findedUser gaada
      if (!findedUser) {
        throw { name: "Unauthorized", message: "Invalid email / password" };
      }

      // kalo findedUser ada bandingkan pwd
      const isTheSamePassword = compareSync(password, findedUser.password);

      // kalo pwdnya beda
      if (!isTheSamePassword) {
        throw { name: "Unauthorized", message: "Invalid email / password" };
      }
      console.log(findedUser.id, "<----userId");
      // kalo pwdnya sama bikin token
      const access_token = createToken({
        id: findedUser.id,
        email: findedUser.email,
      });

      return res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
