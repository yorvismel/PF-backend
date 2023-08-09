const { getCategoriesProducts, createCategory } = require('../controllers/categories')

const getCategories = async (req, res) => {
    try {
        let categories = await getCategoriesProducts()
        res.status(200).json(categories)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createNewCategory = async (req, res) => {
    const { name } = req.body;
    try {
      const newCategory = await createCategory(name);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  ///////////////////////////////

  

module.exports = {
    getCategories, createNewCategory
}