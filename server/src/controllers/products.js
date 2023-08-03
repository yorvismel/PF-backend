const { Product, Category } = require("../db");
const axios = require("axios");

///////////////////////////////////////////////FUNCIONS/////////////////////////////////////////////////////////////////////////////

//Traer todos los productos
const getAllProducts = async () => {
    try {
      // Retrieve videogames from the database along with their associated genres
      const productsDb = await Product.findAll({
        //include: Category, // Include the Genre model
      });
  
      // Map the data from the database
      const arrayProductsDB = productsDb.map((prod) => {
        return {
          id: prod.id,
          title: prod.name,
          price: prod.price,
          description: prod.description,
          image: prod.image,
          rating: prod.rating,
          Category: prod.Category //.map((c) => c.name), // Access the associated genres using the proper association name (Genres)
        };
      });
  
      // Retrieve games from the API
      const arrayProductsApi = [];
      for (let i = 1; i <= 7; i++) {
        let response = await axios.get(
          'https://fakestoreapi.com/products'
        );
        // Map and push product
        response.data.results.map((prod) => {
          arrayProductsApi.push({
            id: prod.id,
            title: prod.name,
            price: prod.price,
            description: prod.description,
            image: prod.image,
            rating: prod.rating,
            Category: prod.Category //.map((c) => c.name),
          });
        });
      }
  
      // Concatenate the data from the database and the API
      return [...arrayProductsDB, ...arrayProductsApi];
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw error;
    }
  };
  
  //Traer los juegos por su nombre
  const getProductsByName = async (name) => {
    try {
      // Search in the database by name
      const productDb = await Product.findAll({
        where: { name: name },
      });
  
      console.log("productDb:", productDb); // Log the value of gamesDb
  
      const arrayProductsDB = productDb.map((prod) => {
        return {
            id: prod.id,
            title: prod.name,
            price: prod.price,
            description: prod.description,
            image: prod.image,
            rating: prod.rating,
            Category: prod.Category//.map((c) => c.name),
        };
      });
  
      let arrayProductsApi = [];
      for (let i = 1; i <= 2; i++) {
        let response = await axios.get(
            `https://fakestoreapi.com/products/${name}` //name
        );
        response.data.results.map((prod) => {
            arrayProductsApi.push({
                id: prod.id,
                title: prod.name,
                price: prod.price,
                description: prod.description,
                image: prod.image,
                rating: prod.rating,
                Category: prod.Category //.map((c) => c.name),
          });
        });
      }
  
      arrayProductsApi = arrayProductsApi.filter(
        (g) => g.name.toLowerCase() || g.name.toUpperCase()
      );
  
      let allProductsByName = [...arrayProductsDB, ...arrayProductsApi].slice(0, 15);
      return allProductsByName;
    } catch (error) {
      console.error("Error in getProductByName:", error); // !!!
      throw error;
    }
  };
  
  //traer los juegos por su id
  
  // Desde la API
  const getProductsAPI = async (id) => {
    const productsAPI = [];
  
    const getByAPI = await axios.get(
      `https://fakestoreapi.com/products/${id}`
    );
    productsAPI.push({
        id: getByAPI.id,
        title: getByAPI.name,
        price: getByAPI.price,
        description: getByAPI.description,
        image: getByAPI.image,
        rating: getByAPI.rating,
        Category: getByAPI.Category //.map((c) => c.name),
    });
  
    return productsAPI;
  };
  
  // Desde la db
  const getProductsDB = async (id) => {
    let productsDB = []
  
    const getproductsDB = await Product.findByPk(
        id,
        {
            include: {
                model: Category,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
  
        productsDB.push({
            id: getproductsDB.id,
            title: getproductsDB.name,
            price: getproductsDB.price,
            description: getproductsDB.description,
            image: getproductsDB.image,
            rating: getproductsDB.rating,
            Category: getproductsDB.Category //.map((c) => c.name),
    })
    return productsDB;
  }
  
  
  // Traer todos los juegos/traer juegos por su nombre
  const getProducts = (name) => {
    if (!name) return getAllProducts(); //Todos los juegos
    else return getProductsByName(name); //Juegos por nombre
  };
  
  //Traer juegos por id
  const getProductsById = async (id, source) => {
    if (source === "API") return getProductsAPI(id); //API
    else return getProductsDB(id); //db
  };
  
  module.exports = {
    getProducts,
    getProductsById,
  };
  