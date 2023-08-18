const { Router } = require("express");

//importacion de rutas

const categories = require("./categories");
const products = require("./products");

const filtercategorie2 = require("./filtercategories");
const stripeRouter = require("./payments.routes");

const router = Router();
//router.use('')

router.use("/categories", categories);

router.use("/products", products);
router.use("/create-checkout-session", stripeRouter);
 router.use('/filter', filtercategorie2)

module.exports = router;