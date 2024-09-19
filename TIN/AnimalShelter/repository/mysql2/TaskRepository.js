const {format} = require('morgan');
const db = require('../../config/mysql2/db');
const taskSchema = require('../../model/joi/Task');

exports.getTasks = () => {
    const query = `SELECT task._id as task_id,
                          task.Status,
                          task.Descr,
                          dog._id as  dog_id,
                          dog.DogName,
                          dog.DateFrom,
                          dog.Healthy,
                          emp._id as  emp_id,
                          emp.EmpName,
                          emp.EmpSurname,
                          emp.DateEmp,
                          emp.EmailEmp,
                          emp.PasswordEmp
                   FROM Task task
                            LEFT JOIN Dog dog on task.Dog_id = dog._id 
    LEFT
                            JOIN Employee emp on task.Emp_id = emp._id`
    return db.promise().query(query)
        .then((results, fields) => {
            const tasks = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const task = {
                    _id: row.task_id,
                    Status: row.Status,
                    Descr: row.Descr,
                    Dog: {
                        _id: row.dog_id,
                        DogName: row.DogName,
                        DateFrom: row.DateFrom,
                        Healthy: row.Healthy
                    },
                    Emp: {
                        _id: row.emp_id,
                        EmpName: row.EmpName,
                        EmpSurname: row.EmpSurname,
                        DateEmp: row.DateEmp,
                        EmailEmp: row.EmailEmp,
                        PasswordEmp: row.PasswordEmp
                    }
                };
                tasks.push(task);
            }
            return tasks;
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getTaskById = (taskId) => {
    const query = `SELECT task._id as task_id,
                          task.Status,
                          task.Descr,
                          dog._id as  dog_id,
                          dog.DogName,
                          dog.DateFrom,
                          dog.Healthy,
                          emp._id as  emp_id,
                          emp.EmpName,
                          emp.EmpSurname,
                          emp.DateEmp,
                          emp.EmailEmp,
                          emp.PasswordEmp
                   FROM Task task
                            LEFT JOIN Dog dog on task.Dog_id = dog._id 
    LEFT
                            JOIN Employee emp on task.Emp_id = emp._id 
    WHERE task._id = ?`
    return db.promise().query(query, [taskId])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return {};
            }
            const task = {
                _id: taskId,
                Status: row.Status,
                Descr: row.Descr,
                Dog: {
                    _id: row.dog_id,
                    DogName: row.DogName,
                    DateFrom: row.DateFrom,
                    Healthy: row.Healthy
                },
                Emp: {
                    _id: row.emp_id,
                    EmpName: row.EmpName,
                    EmpSurname: row.EmpSurname,
                    DateEmp: row.DateEmp,
                    EmailEmp: row.EmailEmp,
                    PasswordEmp: row.PasswordEmp
                }
            };
            return task;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.createTask = (data) => {
    const vTask = taskSchema.validate(data, {abortEarly: false});
    if (vTask.error) {
        return Promise.reject(vTask.error);
    }

    const Status = data.Status;
    const Descr = data.Descr;
    const Dog = data.Dog;
    const Empi = data.Employee;
    const sql = 'INSERT into Task (Status, Descr, Dog_id, Emp_id) VALUES (?,?,?,?)';
    return db.promise().execute(sql, [Status, Descr, Dog, Empi]);
};
exports.updateTask = (taskId, data) => {
    const vTask = taskSchema.validate(data, {abortEarly: false});
    if (vTask.error) {
        return Promise.reject(vTask.error);
    }
    const Status = data.Status;
    const Descr = data.Descr;
    const sql = 'UPDATE Task set Status = ?, Descr = ?, Dog_id = ?, Emp_id = ? WHERE _id = ?';
    return db.promise().execute(sql, [Status, Descr, data.Dog, data.Employee, taskId]);
};
exports.deleteTask = (taskId) => {
    const sql = 'DELETE FROM Task WHERE _id = ?'
    return db.promise().execute(sql, [taskId]);
};
exports.deleteManyTasks = (taskIds) => {
    const sql = 'DELETE FROM Task WHERE _id IN (?)'
    return db.promise().execute(sql, [taskIds]);
};
exports.completeTask = (taskId) => {
    const sql = 'UPDATE Task set Status = 10 WHERE _id = ?';
    return db.promise().execute(sql, [taskId]);
};
exports.progressTask = (taskId) => {
    const sql = 'UPDATE Task set Status=Status+1 WHERE _id = ?';
    return db.promise().execute(sql, [taskId]);
};
exports.resetTask = (taskId) => {
    const sql = 'UPDATE Task set Status=0 WHERE _id = ?';
    return db.promise().execute(sql, [taskId]);
}