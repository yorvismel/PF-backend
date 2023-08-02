const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
     
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     
      gender: {
        type: DataTypes.ENUM("Male", "Female", "No specified", "Others"),
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
