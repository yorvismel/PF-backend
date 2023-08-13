const { Router } = require("express");
const router = Router();

const { filterCategorie } = require('../controllers/categories');

router.get("/", async (req, res) => {
  const filtros = req.query;
  try {
    const categoriesFiltered = await filterCategorie(filtros);
    if (!categoriesFiltered.length)
      return res.status(404).json({ message: "No se encontraron categorias" });
    return res.json(categoriesFiltered); // Usar 'categoriesFiltered' en lugar de 'eventsFiltered'
  } catch (error) {
    return res.status(500).send("Error al buscar categoria");
  }
});

module.exports = router;
