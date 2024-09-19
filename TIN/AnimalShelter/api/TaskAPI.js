const TaskRepository = require('../repository/mysql2/TaskRepository');

exports.getTasks = (req, res, next) => {
    TaskRepository.getTasks()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getTaskById = (req, res, next) => {
    const taskId = req.params.taskId;
    TaskRepository.getTaskById(taskId)
        .then(task => {
            if (!task) {
                res.status(404).json({
                    message: 'Task with id: ' + taskId + ' not found'
                })
            } else {
                res.status(200).json(task);
            }
        });
};
exports.createTask = (req, res, next) => {
    TaskRepository.createTask(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.updateTask = (req, res, next) => {
    const taskId = req.params.taskId;
    TaskRepository.updateTask(taskId, req.body)
        .then(result => {
            res.status(200).json({message: 'Task updated!', task: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteTask = (req, res, next) => {
    const taskId = req.params.taskId;
    TaskRepository.deleteTask(taskId)
        .then(result => {
            res.status(200).json({message: 'Removed task', task: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.completeTask = (req, res, next) => {
    const taskId = req.params.taskId;
    TaskRepository.completeTask(taskId)
        .then(result => {
            res.status(200).json({message: 'Task completed!', task: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.progressTask = (req, res, next) => {
    const taskId = req.params.taskId;
    TaskRepository.progressTask(taskId)
        .then(result => {
            res.status(200).json({message: 'Task progressed!', task: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.resetTask = (req, res, next) => {
    const taskId = req.params.taskId;
    TaskRepository.resetTask(taskId)
        .then(result => {
            res.status(200).json({message: 'Task reseted!', task: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};