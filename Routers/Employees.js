const express = require('express');
const router = express.Router();
const employeesController = require('../Controllers/Employees')

router.get("", employeesController.getAllEmployees);
router.get("/oldest", employeesController.getEmployeesOldest);
router.get("/NAME", employeesController.getEmployeesName);
router.post("", employeesController.postCreateEmployee);

module.exports = router;