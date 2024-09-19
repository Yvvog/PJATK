const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/taskController');
router.get('/', tasksController.showTasksList);
router.get('/add', tasksController.showAddTaskForm);
router.get('/edit/:taskId', tasksController.showEditTaskForm);
router.get('/details/:taskId', tasksController.showTaskDetails);
router.post('/add', tasksController.addTask);
router.post('/edit', tasksController.updateTask);
router.get('/delete/:taskId', tasksController.deleteTask);
router.get('/complete/:taskId', tasksController.completeTask);
router.get('/progress/:taskId', tasksController.progressTask);
router.get('/reset/:taskId', tasksController.resetTask);

module.exports = router;