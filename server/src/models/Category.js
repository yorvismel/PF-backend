const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  // Asociación con Product
  Category.associate = (models) => {
    Category.belongsToMany(models.Product, { through: 'ProductCategory', timestamps: false });
  };

  return Category;
};
