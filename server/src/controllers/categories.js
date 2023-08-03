const axios = require('axios')
const { Category } = require('../db')

// solicita de la API/almacena la info en la db
const getCateoriesProducts = async () => {

    let response = await axios.get('https://fakestoreapi.com/products/categories')
    let Cateories = await response.data.results.map(c => c.name)

    const count = await Category.count();

    if (count === 0) {
        Cateories.forEach(element => {
            Category.create({ name: element })  // Create espera un objeto!
        })
    }
    return Cateories
}

module.exports = {
    getCateoriesProducts
}