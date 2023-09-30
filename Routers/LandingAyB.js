const express = require('express');
const router = express.Router();
const LandingAyBController = require('../Controllers/LandingAyB');
//const LandingAyB = require('../models/LandingAyB');

//GET Todos Landings
router.get("", LandingAyBController.getAllLandingAyB);

//GET Landings por ID
router.get("/:id", LandingAyBController.getLandingByID);

//GET Landings por Idioma
router.get("/custom/langs/getLandingsByIdioma/", LandingAyBController.getLandingsByIdioma);

//POST Nuevo Landing
router.post("", LandingAyBController.postLandingAyB);

module.exports = router;