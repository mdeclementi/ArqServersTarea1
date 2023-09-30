const express = require('express');
//const Users = require('../Models/Users');
const router = express.Router();
const UsersController = require('../Controllers/Users')

const checkAuth = require('../Middlewares/CheckAuth');

//GET Todos los Users
router.get("", UsersController.getAllUsers);

//GET Informacion de 1 Usuario por ID
router.get('/:id', UsersController.getUserByID);

//POST Crear un usuario
router.post('/', checkAuth, UsersController.postCreateUser);

//POST Logear usuario
router.post('/login', UsersController.login);

//POST Status de Token
router.post('/tokenstatus', UsersController.getTokenStatus);

//POST Status de Token
router.post('/tokenowner', UsersController.getTokenOwner);

module.exports = router;