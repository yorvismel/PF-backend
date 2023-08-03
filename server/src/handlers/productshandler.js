const { getProducts, getProductById, createProduct } = require('../controllers/products');

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
    const { title, price, description, image, rating, Category } = req.body;
    try {
      // Creamos el nuevo producto
      const newProduct = await createProduct({
        title,
        price,
        description,
        image,
        rating,
        Category,
      });
  
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
  getAllProducts,
  getProductByIdHandler,
  createNewProduct,
};
