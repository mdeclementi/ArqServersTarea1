const express = require('express');
const habitacionesController = require('../Controllers/Habitaciones')
const router = express.Router();

//GET Todos los Habitaciones
router.get("", habitacionesController.getAllHabs);

//GET Habitacion por ID
router.get("/:id", habitacionesController.getHabByID);

//POST Crear un nuevo Habitacion
router.post("", habitacionesController.postCreateHab);

module.exports = router;