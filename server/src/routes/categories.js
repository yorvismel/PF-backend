const { Router } = require('express');
const { getCategories } = require('../handlers/categorieshandler');


const categories = Router();

categories.get('/', getCategories)

module.exports = categories;