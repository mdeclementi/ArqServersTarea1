const express = require('express');
const reservasController = require('../Controllers/Reservas')
const router = express.Router();

//GET Todas las Reservas
router.get("", reservasController.getAllReservas);

//GET Reserva por ID
router.get("/:id", reservasController.getReservaByID);

//GET Reservas Hoy
router.get("/custom/allReservasHoy", reservasController.getAllReservasHoy);

//GET Reservas Hoy Por Tratamiento
router.get("/custom/allReservasHoyxTratamiento/", reservasController.getAllReservasHoyxTratamiento);

//POST Crear nueva Reserva
router.post("", reservasController.postCreateReserva);

module.exports = router;