const axios = require('axios');
const { Category } = require('../db');
const { Op } = require('sequelize');



const getCategoriesFromAPI = async () => {
  try {
    const response = await axios.get('https://pf-backend-nwu9.onrender.com/categories');
    return response.data.map((name) => ({ name }));
  } catch (error) {
    console.error('Error retrieving categories from API:', error);
    throw error;
  }
};

const filterCategorie = async ({ name }) => {
  const where = {};
  
  if (name) {
    where.name = {
      [Op.iLike]: `%${name}%`,
    };
  }
  
  const categoriesFiltered = await Category.findAll({
    where,
  });

  return categoriesFiltered;
};


const syncCategoriesWithDB = async () => {
  try {
    const categoriesFromAPI = await getCategoriesFromAPI();

    const categoriesFromDB = await Category.findAll();
    const categoryNamesInDB = categoriesFromDB.map((category) => category.name);

    const newCategories = categoriesFromAPI.filter(
      (category) => !categoryNamesInDB.includes(category.name)
    );

    if (newCategories.length > 0) {
      await Category.bulkCreate(newCategories);
    }

    return [...categoriesFromDB, ...newCategories];
  } catch (error) {
    console.error('Error syncing categories with DB:', error);
    throw error;
  }
};

const getCategoriesProducts = async () => {
  try {
    const categories = await syncCategoriesWithDB();
    return categories.map((category) => category.name);
  } catch (error) {
    console.error('Error getting categories from DB:', error);
    throw error;
  }
};

const createCategory = async (name) => {
  try {
    const category = await Category.create({ name });
    return category;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

//////////////////////////////////////////////////////////////


module.exports = {
  getCategoriesProducts, createCategory, filterCategorie,
};
