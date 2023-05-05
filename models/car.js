"use strict";
const { Model } = require("sequelize");
const user = require("../models/user");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  car.init(
    {
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      price: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "car",
    }
  );

  car.associate = function (models) {
    car.belongsTo(models.user, {
      foreignKey: "userId",
    });
  };

  return car;
};
