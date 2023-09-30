const express = require('express');
//const RVCs = require('../Models/RVCs');
const router = express.Router();
const RVCsController = require('../Controllers/RVCs')

//GET Todos los RVCs
router.get("", RVCsController.getAllRVCs);

//GET Informacion de 1 RVC por ID
router.get('/:id', RVCsController.getRVCByID);

//GET RVCs que esten esten activo = 1 o inactivo = 0
router.get("/status/:status", RVCsController.getRVCsByStatus);

//GET RVCs que sean Reservables
router.get("/custom/RVCsActivosReservables", RVCsController.getRVCsActivosReservables);

//POST Crear un nuevo RVC
router.post("", RVCsController.postCreateRVC);

module.exports = router;