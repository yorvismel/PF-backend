const { Router } = require('express');
const {
  getAllProducts,
  getProductByIdHandler,
  createNewProduct, // Agregamos esta línea
} = require('../handlers/productshandler');

const products = Router();

products.get('/', getAllProducts);
products.get('/:id', getProductByIdHandler);
products.post('/', createNewProduct); // Agregamos esta línea

module.exports = products;
