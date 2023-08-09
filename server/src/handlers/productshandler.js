const { 
  getProducts, 
  getProductById, 
  createProduct,   
  filterProductsByCategory,
  sortProductsByPriceFromDB,
  sortProductsByNameFromDB, } = require('../controllers/products');

const getAllProducts = async (req, res) => {
  const { title } = req.query;
  try {
    const products = await getProducts(title);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNewProduct = async (req, res) => {
  const { title, price, description, image, rating, categories } = req.body; // Cambio aquí
  try {
    // Creamos el nuevo producto
    const newProduct = await createProduct({
      title,
      price,
      description,
      image,
      rating,
      categories, // Cambio aquí
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//////////////////////
const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;
  try {
    const products = await filterProductsByCategory(categoryName);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sortProductsByPrice = async (req, res) => {
  const { order } = req.params;
  try {
    const products = await sortProductsByPriceFromDB(order);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sortProductsByName = async (req, res) => {
  const { order } = req.params;
  try {
    const products = await sortProductsByNameFromDB(order);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductByIdHandler,
  createNewProduct,
  getProductsByCategory,
  sortProductsByPrice,
  sortProductsByName,
};
