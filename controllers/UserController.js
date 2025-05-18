const { User } = require("../models");
class UserController {
  static async registerUser(req, res, next) {
    try {
      //   console.log(req.body);
      const { name, email, password } = req.body;
      //   console.log(User);
      const user = await User.create({ name, email, password });
      //   console.log(user);
      return await res.status(201).json({
        message: `User ${user.name} created sucessfully`,
      });
    } catch (error) {
      //   console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
