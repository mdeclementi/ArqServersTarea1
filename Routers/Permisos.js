const express = require('express');
//const RVCs = require('../Models/RVCs');
const router = express.Router();
const PermisosController = require('../Controllers/Permisos')

//GET Todos los Permisos
router.get("", PermisosController.getAllPermisos);

//POST Obtener Permiso por Nombre
router.post("", PermisosController.getPermisoByNombre);

//POST Obtener Permiso por User
router.post("/permisoByUser", PermisosController.getPermisoByUser);

module.exports = router;