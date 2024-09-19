const express = require('express');
const router = express.Router();

const taskApiController = require('../../api/TaskAPI');

router.get('/', taskApiController.getTasks);
router.get('/:taskId', taskApiController.getTaskById);
router.post('/', taskApiController.createTask);
router.put('/:taskId', taskApiController.updateTask);
router.delete('/:taskId', taskApiController.deleteTask);
router.put('/:taskId', taskApiController.completeTask);
router.put('/:taskId', taskApiController.progressTask);
router.put('/:taskId', taskApiController.resetTask);

module.exports = router;