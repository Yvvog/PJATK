const employeeRepository = require('../repository/mysql2/EmployeeRepository');

exports.showEmployeesList = (req, res, next) => {
    employeeRepository.getEmployees()
        .then(employees => {
            res.render('pages/employees/list', {
                employees: employees,
                navLocation: 'employee',
                validationErrors: []
            });
        });
}
exports.showAddEmployeeForm = (req, res, next) => {
    res.render('pages/employees/form', {
        emp: {},
        pageTitle: req.__('employee.form.New.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('employee.form.New.btnLabel'),
        formAction: '/employees/add',
        navLocation: 'employee',
        validationErrors: []
    });
}
exports.showEditEmployeeForm = (req, res, next) => {
    const empId = req.params.empId;
    employeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employees/form', {
                emp: emp,
                formMode: 'edit',
                pageTitle: req.__('employee.form.Edit.pageTitle'),
                btnLabel: req.__('employee.form.Edit.btnLabel'),
                formAction: '/employees/edit',
                navLocation: 'employee',
                validationErrors: []
            });
        });
}
exports.showEmployeeDetails = (req, res, next) => {
    const empId = req.params.empId;
    employeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employees/form', {
                emp: emp,
                formMode: 'showDetails',
                pageTitle: req.__('employee.form.Details.pageTitle'),
                formAction: '/employees/details',
                navLocation: 'employee',
                validationErrors: []
            });
        });
}
exports.addEmployee = (req, res, next) => {
    const empData = {...req.body};
    employeeRepository.createEmployee(empData)
        .then(result => {
            res.redirect('/employees');
        })
        .catch(err => {
            res.render('pages/employees/form', {
                emp: empData,
                pageTitle: req.__('employee.form.New.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('employee.form.New.btnLabel'),
                formAction: '/employees/add',
                navLocation: 'employee',
                validationErrors: err.details
            });
        });
};
exports.updateEmployee = (req, res, next) => {
    const empId = req.body._id;
    const empData = {...req.body};
    employeeRepository.updateEmployee(empId, empData)
        .then(result => {
            res.redirect('/employees');
        })
        .catch(err => {
            res.render('pages/employees/form', {
                emp: empData,
                pageTitle: req.__('employee.form.Edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('employee.form.Edit.btnLabel'),
                formAction: '/employees/edit',
                navLocation: 'employee',
                validationErrors: err.details
            });
        });
};
exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.empId;
    employeeRepository.deleteEmployee(empId)
        .then(() => {
            res.redirect('/employees');
        });
};