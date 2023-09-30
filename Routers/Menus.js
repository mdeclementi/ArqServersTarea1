const express = require('express');
const menusController = require('../Controllers/Menus')
const router = express.Router();

//GET Todos los Menus
router.get("", menusController.getAllMenus);

//GET Menu por ID
router.get("/:id", menusController.getMenuByID);

//POST Crear un nuevo Menu
router.post("", menusController.postCreateMenu);

module.exports = router;