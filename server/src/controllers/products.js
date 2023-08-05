const axios = require('axios');
const { Product, Category } = require('../db');

const getAllProductsFromAPI = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.error("Error retrieving products from API:", error);
    throw error;
  }
};

const getAllProductsFromDB = async () => {
    try {
      const productsDb = await Product.findAll({
        include: Category,
      });
  
      return productsDb.map((prod) => ({
        id: prod.id,
        title: prod.title,
        price: prod.price,
        description: prod.description,
        image: prod.image,
        rating: prod.rating,
        Category: prod.Category ? prod.Category.name : null, // Verificar si la categoría existe antes de acceder a su nombre
      }));
    } catch (error) {
      console.error("Error retrieving products from DB:", error);
      throw error;
    }
  };
  

const getProducts = async (title) => {
  try {
    const productsFromDB = await getAllProductsFromDB();
    const productsFromAPI = await getAllProductsFromAPI();

    const allProducts = [...productsFromAPI, ...productsFromDB];

    if (title) {
      const filteredProducts = allProducts.filter(
        (product) => product.title.toLowerCase().includes(title.toLowerCase())
      );
      return filteredProducts.slice(0, 15);
    }

    return allProducts;
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw error;
  }
};

const getProductByIdFromAPI = async (id) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving product from API:", error);
    return null;
  }
};

const getProductByIdFromDB = async (id) => {
  try {
    const productDB = await Product.findByPk(id, {
      include: Category,
    });

    if (productDB) {
      return {
        id: productDB.id,
        title: productDB.title,
        price: productDB.price,
        description: productDB.description,
        image: productDB.image,
        rating: productDB.rating,
        Category: productDB.Category.name,
      };
    }

    return null;
  } catch (error) {
    console.error("Error retrieving product from DB:", error);
    return null;
  }
};

const getProductById = async (id) => {
  const productAPI = await getProductByIdFromAPI(id);
  if (productAPI) {
    return productAPI;
  }

  return getProductByIdFromDB(id);
};

const createProduct = async (productData) => {
  try {
    const { Category: categoryName, ...rest } = productData;

    let product;
    if (categoryName) {
      // Buscar o crear la categoría
      const [category, created] = await Category.findOrCreate({
        where: { name: categoryName },
      });

      // Crear el producto y establecer la relación con la categoría
      product = await Product.create({
        ...rest,
        CategoryId: category.id,
      });
    } else {
      // Si no se proporciona categoría, crear solo el producto sin relación
      product = await Product.create(rest);
    }

    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      rating: product.rating,
      Category: categoryName || null,
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const getProductsByTitleFromAPI = async (title) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    if (title) {
      const filteredProducts = products.filter(
        (product) => product.title.toLowerCase().includes(title.toLowerCase())
      );
      return filteredProducts.slice(0, 15);
    }

    return products;
  } catch (error) {
    console.error("Error retrieving products from API:", error);
    throw error;
  }
};

const getProductsByTitleFromDB = async (title) => {
  try {
    const productsDb = await Product.findAll({
      include: Category,
      where: {
        title: {
          [Sequelize.Op.iLike]: `%${title}%`,
        },
      },
    });

    return productsDb.map((prod) => ({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      rating: prod.rating,
      Category: prod.Category ? prod.Category.name : null,
    }));
  } catch (error) {
    console.error("Error retrieving products from DB:", error);
    throw error;
  }
};

const getProductsByTitle = async (title) => {
  const productsFromAPI = await getProductsByTitleFromAPI(title);
  const productsFromDB = await getProductsByTitleFromDB(title);

  const allProducts = [...productsFromAPI, ...productsFromDB];
  return allProducts.slice(0, 15);
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByTitle,
  createProduct,
};

