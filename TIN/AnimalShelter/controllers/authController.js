const VisitorRepository = require('../repository/mysql2/VisitorRepository');
const EmployeeRepository = require('../repository/mysql2/EmployeeRepository');
const authUtil = require("../utils/authUtils");

exports.login = (req, res, next) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    let viss, emps;
    //console.log(VisitorRepository.findByEmail(Email).Name);
    VisitorRepository.findByEmail(Email)
        .then(Vis => {
            viss = Vis;
            console.log("viss " + viss.Name);
            return EmployeeRepository.findByEmail(Email);
        })
        .then(Emp => {
            emps = Emp;
            console.log("emps " + emps.EmpName);
            if ((viss.Name == null) && (emps.EmpName == null)) {
                res.render('index', {
                    navLocation: 'main',
                    loginError: "Invalid email address or password"
                })
            } else if ((viss.Name != null) && (emps.EmpName == null)) {
                console.log("Viss: " + viss);
                console.log(viss.Password);
                if (authUtil.comparePasswords(Password, viss.Password) === true) {
                    req.session.visi = true;
                    req.session.empi = false;
                    if (viss.Email == "admin@gmail.com") {
                        req.session.admin = true;
                    } else {
                        req.session.admin = false;
                    }
                    req.session.loggedUser = viss;
                    console.log("visi " + req.session.loggedUser.Name);
                    console.log("visi " + req.session.loggedUser.Surname);
                    console.log(req.session.visi);
                    res.redirect('/');
                } else {
                    res.render('index', {
                        navLocation: 'main',
                        loginError: "Wrong password"
                    })
                }
            } else if ((viss.Name == null) && (emps.EmpName != null)) {
                console.log("Emps: " + emps);
                console.log(emps.PasswordEmp);
                if (authUtil.comparePasswords(Password, emps.PasswordEmp) === true) {
                    req.session.empi = true;
                    req.session.visi = false;
                    console.log(emps.EmailEmp);
                    if (emps.EmailEmp == "admin@gmail.com") {
                        req.session.admin = true;
                    } else {
                        req.session.admin = false;
                    }
                    req.session.loggedUser = emps;
                    console.log("empi " + req.session.loggedUser.EmpName);
                    console.log("empi " + req.session.loggedUser.EmpSurname);
                    console.log(req.session.empi);
                    console.log(req.session.admin);

                    res.redirect('/');
                } else {
                    res.render('index', {
                        navLocation: 'main',
                        loginError: "Wrong password"
                    })
                }
            } else {
                res.render('index', {
                    navLocation: 'main',
                    loginError: "Invalid email address or password"
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
};
exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    req.session.admin = false;
    req.session.visi = false;
    req.session.empi = false;

    res.redirect('/');
};