const { Router } = require("express");

//importacion de rutas

const categories = require("./categories");
const products = require("./products");

const router = Router();
//router.use('')

router.use("/categories", categories);
router.use("/products", products);

module.exports = router;