const express = require('express');
const ocasionesController = require('../Controllers/Ocasiones')
const router = express.Router();

//GET Todos los Ocasiones
router.get("", ocasionesController.getAllOcasiones);

//GET Ocasion por ID
router.get("/:id", ocasionesController.getOcasionByID);

//POST Crear un nuevo Ocasion
router.post("", ocasionesController.postCreateOcasion);

module.exports = router;