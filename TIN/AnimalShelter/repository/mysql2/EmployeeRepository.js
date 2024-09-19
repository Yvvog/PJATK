const {format} = require('morgan');
const db = require('../../config/mysql2/db');
const empSchema = require('../../model/joi/Employee');
const empSchemaEdit = require('../../model/joi/EmployeeEdit');
const authUtil = require('../../utils/authUtils');
exports.getEmployees = () => {
    return db.promise().query('SELECT * FROM Employee')
        .then((results, fields) => {
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.getEmployeeById = (empId) => {
    const query = 'SELECT emp._id as _id, emp.EmpName, emp.EmpSurname, emp.DateEmp, emp.EmailEmp, emp.PasswordEmp, task._id as task_id, task.Status, task.Descr, dog._id as dog_id, dog.DogName, dog.DateFrom, dog.Healthy FROM Employee emp LEFT JOIN Task task on task.Emp_id=emp._id left join Dog dog on task.Dog_id=dog._id where emp._id = ?'
    return db.promise().query(query, [empId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const Emp = {
                _id: parseInt(empId),
                EmpName: firstRow.EmpName,
                EmpSurname: firstRow.EmpSurname,
                DateEmp: firstRow.DateEmp,
                EmailEmp: firstRow.EmailEmp,
                PasswordEmp: firstRow.PasswordEmp,
                tasks: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.task_id) {
                    const task = {
                        _id: row.task_id,
                        Status: row.Status,
                        Descr: row.Descr,
                        Dog: {
                            _id: row.dog_id,
                            DogName: row.DogName,
                            DateFrom: row.DateFrom,
                            Healthy: row.Healthy
                        }
                    };
                    Emp.tasks.push(task);
                }
            }
            return Emp;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.createEmployee = (empData) => {
    const vEmp = empSchema.validate(empData, {abortEarly: false});
    if (vEmp.error) {
        return Promise.reject(vEmp.error);
    }
    return checkEmailUnique(empData.EmailEmp)
        .then(emailErr => {
            if (Object.entries(emailErr).length !== 0) {
                return Promise.reject(emailErr);
            } else {
                const EmpName = empData.EmpName;
                const EmpSurname = empData.EmpSurname;
                const DateEmp = empData.DateEmp;
                const EmailEmp = empData.EmailEmp;
                var PasswordEmp = empData.PasswordEmp;
                const passHash = authUtil.hashPassword(PasswordEmp);

                const sql = 'INSERT INTO Employee(EmpName, EmpSurname, DateEmp, EmailEmp, PasswordEmp) VALUES (?,?,?,?,?)';
                return db.promise().execute(sql, [EmpName, EmpSurname, DateEmp, EmailEmp, passHash]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });

};
exports.updateEmployee = (empId, empData) => {
    const vEmp = empSchemaEdit.validate(empData, {abortEarly: false});

    if (vEmp.error) {
        return Promise.reject(vEmp.error);
    }
    console.log("checkEmailUnique: " + checkEmailUnique(empData.EmailEmp, empId));
    return checkEmailUnique(empData.EmailEmp, empId)
        .then(emailErr => {

            console.log("Object length: " + Object.entries(emailErr).length);
            if (Object.entries(emailErr).length !== 0) {
                return Promise.reject(emailErr);
            } else {
                const EmpName = empData.EmpName;
                const EmpSurname = empData.EmpSurname;
                const DateEmp = empData.DateEmp;
                const EmailEmp = empData.EmailEmp;
                var sql;
                if (empData.PasswordEmp == "" || empData.PasswordEmp == null) {
                    sql = 'UPDATE Employee set EmpName = ?, EmpSurname = ?, DateEmp = ?, EmailEmp = ? where _id = ?';
                    return db.promise().execute(sql, [EmpName, EmpSurname, DateEmp, EmailEmp, empId]);
                } else {
                    const passHash = authUtil.hashPassword(empData.Password);
                    const sql = 'UPDATE Employee set EmpName = ?, EmpSurname = ?, DateEmp = ?, EmailEmp = ?, PasswordEmp = ? where _id = ?';
                    return db.promise().execute(sql, [EmpName, EmpSurname, DateEmp, EmailEmp, passHash, empId]);
                }

            }
        })
        .catch(err => {
            console.log("error");
            return Promise.reject(err);
        });
};
exports.deleteEmployee = (empId) => {
    const sql1 = 'DELETE FROM Task where Emp_id = ?'
    const sql2 = 'DELETE FROM Employee where _id = ?'
    return db.promise().execute(sql1, [empId])
        .then(() => {
            return db.promise().execute(sql2, [empId])
        });
};
checkEmailUnique = (Email, empId) => {
    let sql, promise;
    if (empId) {
        sql = `SELECT COUNT(1) as c
               FROM Employee
               where _id != ? and EmailEmp = ?`;
        promise = db.promise().query(sql, [empId, Email]);
    } else {
        sql = `SELECT COUNT(1) as c
               FROM Employee
               where EmailEmp = ?`;
        promise = db.promise().query(sql, [Email]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if (count > 0) {
            err = {
                details: [{
                    path: ['EmailEmp'],
                    message: 'The entered email address is already in use.'
                }]
            };
        }
        return err;
    });
};
exports.findByEmail = (Email) => {
    const sql = `SELECT emp._id as _id, emp.EmpName, emp.EmpSurname, emp.DateEmp, emp.EmailEmp, emp.PasswordEmp
                 FROM Employee emp
                 where emp.EmailEmp = ?`;
    return db.promise().execute(sql, [Email])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const Emp = {
                _id: parseInt(firstRow._id),
                EmpName: firstRow.EmpName,
                EmpSurname: firstRow.EmpSurname,
                DateEmp: firstRow.DateEmp,
                EmailEmp: firstRow.EmailEmp,
                PasswordEmp: firstRow.PasswordEmp,
                tasks: []
            }
            console.log("repository emp " + Emp);
            return Emp;
        })
};