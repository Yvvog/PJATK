const contrRepository = require('../repository/mysql2/ContractRepository');
const dogRepository = require('../repository/mysql2/DogRepository');
const visRepository = require('../repository/mysql2/VisitorRepository');

exports.showContractsList = (req, res, next) => {
    contrRepository.getContracts()
        .then(contr => {
            res.render('pages/contracts/list', {
                contrs: contr,
                navLocation: 'contract',
                validationErrors: []
            });
        });
};
exports.showAddContractForm = (req, res, next) => {
    let allViss, allDogs;
    visRepository.getVisitors()
        .then(viss => {
            allViss = viss;
            return dogRepository.getDogs();
        })
        .then(dogs => {
            allDogs = dogs;
            res.render('pages/contracts/form', {
                contr: {},
                formMode: 'createNew',
                allViss: allViss,
                allDogs: allDogs,
                pageTitle: req.__('contract.form.New.pageTitle'),
                btnLabel: req.__('contract.form.New.btnLabel'),
                formAction: '/contracts/add',
                navLocation: 'contract',
                validationErrors: []
            });
        });
};

exports.showEditContractForm = (req, res, next) => {
    const contrId = req.params.contrId;
    let allViss, allDogs;
    visRepository.getVisitors()
        .then(viss => {
            allViss = viss;
            return dogRepository.getDogs();
        })
        .then(dogs => {
            allDogs = dogs;
            return contrRepository.getContractById(contrId);
        })
        .then(contr => {
            res.render('pages/contracts/form', {
                contr: contr,
                formMode: 'showEdit',
                allViss: allViss,
                allDogs: allDogs,
                btnLabel: req.__('contract.form.Edit.btnLabel'),
                pageTitle: req.__('contract.form.Edit.pageTitle'),
                formAction: '/contracts/edit',
                navLocation: 'contract',
                validationErrors: []
            });
        });
};

exports.showContractDetails = (req, res, next) => {
    const contrId = req.params.contrId;
    let allViss, allDogs;
    visRepository.getVisitors()
        .then(viss => {
            allViss = viss;
            return dogRepository.getDogs();
        })
        .then(dogs => {
            allDogs = dogs;
            return contrRepository.getContractById(contrId);
        })
        .then(contr => {
            res.render('pages/contracts/form', {
                contr: contr,
                formMode: 'showDetails',
                allViss: allViss,
                allDogs: allDogs,
                pageTitle: req.__('contract.form.pageTitle'),
                formAction: '',
                navLocation: 'contract',
                validationErrors: []
            });
        });
};

exports.addContract = (req, res, next) => {
    const contrData = {...req.body};
    contrRepository.createContract(contrData)
        .then(result => {
            res.redirect('/contracts');
        })
        .catch(err => {
            let allViss, allDogs;
            const visPromise = visRepository.getVisitors();
            const dogPromise = dogRepository.getDogs();
            Promise.all([visPromise, dogPromise])
                .then(([viss, dogs]) => {
                    res.render('pages/contracts/form', {
                        contr: contrData,
                        pageTitle: req.__('contract.form.New.pageTitle'),
                        formMode: 'createNew',
                        btnLabel: req.__('contract.form.New.btnLabel'),
                        formAction: '/contracts/add',
                        navLocation: 'contract',
                        allViss: viss,
                        allDogs: dogs,
                        validationErrors: err.details
                    });
                });
        });
};
exports.updateContract = (req, res, next) => {
    const contrId = req.body._id;
    const contrData = {...req.body};
    contrRepository.updateContract(contrId, contrData)
        .then(result => {
            res.redirect('/contracts');
        })
        .catch(err => {
            const visPromise = visRepository.getVisitors();
            const dogPromise = dogRepository.getDogs();
            Promise.all([visPromise, dogPromise])
                .then(([viss, dogs]) => {
                    res.render('pages/contracts/form', {
                        contr: contrData,
                        pageTitle: req.__('contract.form.Edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: req.__('contract.form.Edit.btnLabel'),
                        formAction: '/contracts/edit',
                        navLocation: 'contract',
                        allViss: viss,
                        allDogs: dogs,
                        validationErrors: err.details
                    });
                });
        });
};
exports.deleteContract = (req, res, next) => {
    const contrId = req.params.contrId;
    contrRepository.deleteContract(contrId)
        .then(() => {
            res.redirect('/contracts');
        });
};