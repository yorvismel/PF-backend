const { Router } = require("express");

//importacion de rutas

const categories = require("./categories");
const products = require("./products");
const payments = require('./payments')

const router = Router();
//router.use('')

router.use("/categories", categories);
router.use("/products", products);
router.use('/payments', payments);

module.exports = router;