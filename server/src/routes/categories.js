const { Router } = require('express');
const { getCategories, createNewCategory } = require('../handlers/categorieshandler');

const categories = Router();

categories.get('/', getCategories);
categories.post('/', createNewCategory); // Definición de la ruta POST para crear una categoría

module.exports = categories;
