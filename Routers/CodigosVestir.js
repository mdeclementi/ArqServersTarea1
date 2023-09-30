const express = require('express');
const CodigosVestirController = require('../Controllers/CodigosVestir')
const router = express.Router();

//GET Todos los Codigos de Vestir
router.get("", CodigosVestirController.getAllCodigosVestir);

//GET Codigo de Vestir por ID
router.get("/:id", CodigosVestirController.getCodigoVestirByID);

//POST Crear un nuevo Codigo de Vestir
router.post("", CodigosVestirController.postCodigoVestir);

module.exports = router;