const { Router } = require("express");

//importacion de rutas

const categories = require("./categories");
const products = require("./products");

const filtercategorie2 = require("./filtercategories");
const payments = require('./payments.routes')

const router = Router();
//router.use('')

router.use("/categories", categories);

router.use("/products", products);
router.use('/payments', payments);
 router.use('/filter', filtercategorie2)

module.exports = router;