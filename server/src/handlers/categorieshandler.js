const { getCategoriesProducts } = require('../controllers/categories')

const getCategories = async (req, res) => {
    try {
        let categories = await getCategoriesProducts()
        res.status(200).json(categories)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getCategories
}