const taskRepository = require('../repository/mysql2/TaskRepository');
const dogRepository = require('../repository/mysql2/DogRepository');
const empRepository = require('../repository/mysql2/EmployeeRepository');

exports.showTasksList = (req, res, next) => {
    taskRepository.getTasks()
        .then(task => {
            res.render('pages/tasks/list', {
                tasks: task,
                navLocation: 'task',
                validationErrors: []
            });
        });
};
exports.showAddTaskForm = (req, res, next) => {
    let allEmps, allDogs;
    empRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return dogRepository.getDogs();
        })
        .then(dogs => {
            allDogs = dogs;
            res.render('pages/tasks/form', {
                task: {},
                formMode: 'createNew',
                allEmps: allEmps,
                allDogs: allDogs,
                pageTitle: req.__('task.form.New.pageTitle'),
                btnLabel: req.__('task.form.New.btnLabel'),
                formAction: '/tasks/add',
                navLocation: 'task',
                validationErrors: []
            });
        });
};

exports.showEditTaskForm = (req, res, next) => {
    const taskId = req.params.taskId;
    let allEmps, allDogs;
    empRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return dogRepository.getDogs();
        })
        .then(dogs => {
            allDogs = dogs;
            return taskRepository.getTaskById(taskId);
        })
        .then(task => {
            res.render('pages/tasks/form', {
                task: task,
                formMode: 'showEdit',
                allEmps: allEmps,
                allDogs: allDogs,
                btnLabel: req.__('task.form.Edit.btnLabel'),
                pageTitle: req.__('task.form.Edit.pageTitle'),
                formAction: '/tasks/edit',
                navLocation: 'task',
                validationErrors: []
            });
        });
};

exports.showTaskDetails = (req, res, next) => {
    const taskId = req.params.taskId;
    let allEmps, allDogs;
    empRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return dogRepository.getDogs();
        })
        .then(dogs => {
            allDogs = dogs;
            return taskRepository.getTaskById(taskId);
        })
        .then(task => {
            res.render('pages/tasks/form', {
                task: task,
                formMode: 'showDetails',
                allEmps: allEmps,
                allDogs: allDogs,
                pageTitle: req.__('task.form.pageTitle'),
                formAction: '',
                navLocation: 'task',
                validationErrors: []
            });
        });
};

exports.addTask = (req, res, next) => {
    const taskData = {...req.body};
    if (taskData.Status == null) {
        taskData.Status = 0;
    }
    taskRepository.createTask(taskData)
        .then(result => {
            res.redirect('/tasks');
        })
        .catch(err => {
            let allViss, allDogs;
            const empPromise = empRepository.getEmployees();
            const dogPromise = dogRepository.getDogs();
            Promise.all([empPromise, dogPromise])
                .then(([emps, dogs]) => {
                    res.render('pages/tasks/form', {
                        task: taskData,
                        pageTitle: req.__('task.form.New.pageTitle'),
                        formMode: 'createNew',
                        btnLabel: req.__('task.form.New.btnLabel'),
                        formAction: '/tasks/add',
                        navLocation: 'task',
                        allEmps: emps,
                        allDogs: dogs,
                        validationErrors: err.details
                    });
                });
        });
};
exports.updateTask = (req, res, next) => {
    const taskId = req.body._id;
    const taskData = {...req.body};
    if (taskData.Status == null) {
        taskData.Status = 0;
    }
    taskRepository.updateTask(taskId, taskData)
        .then(result => {
            res.redirect('/tasks');
        })
        .catch(err => {
            const empPromise = empRepository.getEmployees();
            const dogPromise = dogRepository.getDogs();
            Promise.all([empPromise, dogPromise])
                .then(([emps, dogs]) => {
                    res.render('pages/tasks/form', {
                        task: taskData,
                        pageTitle: req.__('task.form.Edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: req.__('task.form.Edit.btnLabel'),
                        formAction: '/tasks/edit',
                        navLocation: 'task',
                        allEmps: emps,
                        allDogs: dogs,
                        validationErrors: err.details
                    });
                });
        });
};
exports.deleteTask = (req, res, next) => {
    const taskId = req.params.taskId;
    taskRepository.deleteTask(taskId)
        .then(() => {
            res.redirect('/tasks');
        });
};
exports.completeTask = (req, res, next) => {
    const taskId = req.params.taskId;
    let taskk;
    taskRepository.getTaskById(taskId)
        .then(task => {
            console.log(task.Descr);
            taskk = task;
            console.log(taskk.Dog._id);
            if (taskk.Descr == "Heal") {
                dogRepository.healDog(taskk.Dog._id);
            } else if (taskk.Descr.substr(0, 4) == "Walk") {
                const namee = taskk.Descr.substr(4).trim();
                dogRepository.walkDog(taskk.Dog._id, namee);
            }
            return taskRepository.completeTask(taskId);
        })
        .then(result => {
            res.redirect('/tasks');
        })
};
exports.progressTask = (req, res, next) => {
    const taskId = req.params.taskId;
    let taskk;
    taskRepository.getTaskById(taskId)
        .then(task => {
            return taskRepository.progressTask(taskId);
        })
        .then(result => {
            res.redirect('/tasks');
        })
};
exports.resetTask = (req, res, next) => {
    const taskId = req.params.taskId;
    let taskk;
    taskRepository.getTaskById(taskId)
        .then(task => {
            return taskRepository.resetTask(taskId);
        })
        .then(result => {
            res.redirect('/tasks');
        })
};