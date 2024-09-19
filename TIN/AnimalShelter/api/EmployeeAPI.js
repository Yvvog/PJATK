const employeeRepository = require('../repository/mysql2/EmployeeRepository');
exports.getEmployees = (req, res, next) => {
    employeeRepository.getEmployees
        .then(employees => {
            res.status(200).json(employees);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getEmployeeById = (req, res, next) => {
    const empId = req.params.empId;
    employeeRepository.getEmployeeById(empId)
        .then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'Employee with id: ' + empId + ' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};
exports.createEmployee = (req, res, next) => {
    employeeRepository.createEmployee(req.body)
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
exports.updateEmployee = (req, res, next) => {
    const empId = req.params.empId;
    employeeRepository.updateEmployee(empId, req.body)
        .then(result => {
            res.status(200).json({message: 'Employee updated!', emp: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.empId;
    employeeRepository.deleteEmployee(empId)
        .then(result => {
            res.status(200).json({message: 'Removed employee', emp: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};