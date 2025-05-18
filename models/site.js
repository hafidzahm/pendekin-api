"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Site.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Site.init(
    {
      UserId: DataTypes.INTEGER,
      shorted_site: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      original_site: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },

      click_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Site",
    }
  );
  return Site;
};
