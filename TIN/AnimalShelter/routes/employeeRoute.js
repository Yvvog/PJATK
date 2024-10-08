const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeeController');
router.get('/', employeesController.showEmployeesList);
router.get('/add', employeesController.showAddEmployeeForm);
router.get('/edit/:empId', employeesController.showEditEmployeeForm);
router.get('/details/:empId', employeesController.showEmployeeDetails);
router.post('/add', employeesController.addEmployee);
router.post('/edit', employeesController.updateEmployee);
router.get('/delete/:empId', employeesController.deleteEmployee);
module.exports = router;