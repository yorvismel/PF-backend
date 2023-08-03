const {Router} = require('express');
const {
    getProd, 
    getProdById, 
    } = require('../handlers/productshandler');

const products = Router();

products.get('/', getProd); //Trae productos

products.get('/:idVideogame', getProdById); //Trae productos por id




module.exports = products;