const {  getProducts, getProductsById } = require('../controllers/products')


//traer todos los juegos o traerlos por sus nombres
const getProd = async (req, res) => {
    const { name } = req.query
    try {
        const products = await getProducts(name);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// traer juegos por id
const getProdById = async (req, res) => {
    const { idProduct } = req.params;
    const source = isNaN(idProduct) ? 'DB' : 'API';
    try {
        const productsById = await getProductsById(idProduct, source);
        res.status(200).json(productsById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getProd,
    getProdById,
}