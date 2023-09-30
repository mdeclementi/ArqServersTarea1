const express = require('express');
const router = express.Router();
const DisponibilidadController = require('../Controllers/Disponibilidad');
//const LandingAyB = require('../models/LandingAyB');

//GET Todos LDisnponibilidad
router.get("", DisponibilidadController.getAllDisps);

//GET Disponibilidad por ID
router.get("/:id", DisponibilidadController.getDispByID);

//GET Disponibilidad de RVC por Fecha y PAX
router.get("/custom/rvc/byfechaypax", DisponibilidadController.getDispRVCByFechaYPAX);

//GET Disponibilidades por RVC y Fecha
router.post("/custom/rvc/getDispsByRVCyFecha", DisponibilidadController.getDispsByRVCyFecha);

//GET Disponibilidades por RVC, Fecha y PAX
router.get("/custom/rvc/getDispsByRVCFechaYPAX", DisponibilidadController.getDispsByRVCFechaYPAX);

//POST Nuevo Disponibilidad
router.post("", DisponibilidadController.postCreateDisp);

module.exports = router;