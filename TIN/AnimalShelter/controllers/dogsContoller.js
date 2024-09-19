const dogRepository = require('../repository/mysql2/DogRepository');
exports.showDogsList = (req, res, next) => {
    dogRepository.getDogs()
        .then(dogs => {
            res.render('pages/dogs/list', {
                dogs: dogs,
                navLocation: 'dog',
                validationErrors: []
            });
        });
}
exports.showAddDogForm = (req, res, next) => {
    res.render('pages/dogs/form', {
        dog: {},
        pageTitle: req.__('dog.form.New.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('dog.form.New.btnLabel'),
        formAction: '/dogs/add',
        navLocation: 'dog',
        validationErrors: []
    });
}
exports.showEditDogForm = (req, res, next) => {
    const dogId = req.params.dogId;
    dogRepository.getDogById(dogId)
        .then(dog => {
            res.render('pages/dogs/form', {
                dog: dog,
                formMode: 'edit',
                pageTitle: req.__('dog.form.Edit.pageTitle'),
                btnLabel: req.__('dog.form.Edit.btnLabel'),
                formAction: '/dogs/edit',
                navLocation: 'dog',
                validationErrors: []
            });
        });
}
exports.showDogDetails = (req, res, next) => {
    const dogId = req.params.dogId;
    dogRepository.getDogById(dogId)
        .then(dog => {
            res.render('pages/dogs/form', {
                dog: dog,
                formMode: 'showDetails',
                pageTitle: req.__('dog.form.Details.pageTitle'),
                formAction: '',
                navLocation: 'dog',
                validationErrors: []
            });
        });
}
exports.addDog = (req, res, next) => {
    const dogData = {...req.body};
    dogRepository.createDog(dogData)
        .then(result => {
            res.redirect('/dogs');
        })
        .catch(err => {
            res.render('pages/dogs/form', {
                dog: dogData,
                pageTitle: req.__('dog.form.New.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('dog.form.New.btnLabel'),
                formAction: '/dogs/add',
                navLocation: 'dog',
                validationErrors: err.details
            });
        });
};
exports.updateDog = (req, res, next) => {
    const dogId = req.body._id;
    const dogData = {...req.body};
    dogRepository.updateDog(dogId, dogData)
        .then(result => {
            res.redirect('/dogs');
        })
        .catch(err => {
            res.render('pages/dogs/form', {
                dog: dogData,
                pageTitle: req.__('dog.form.Edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('dog.form.Edit.btnLabel'),
                formAction: '/dogs/edit',
                navLocation: 'dog',
                validationErrors: err.details
            });
        });
};
exports.deleteDog = (req, res, next) => {
    const dogId = req.params.dogId;
    dogRepository.deleteDog(dogId)
        .then(() => {
            res.redirect('/dogs');
        });
};