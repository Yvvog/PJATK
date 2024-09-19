const visitorRepository = require('../repository/mysql2/VisitorRepository');

exports.showVisitorsList = (req, res, next) => {
    visitorRepository.getVisitors()
        .then(visitors => {
            res.render('pages/visitors/list', {
                visitors: visitors,
                navLocation: 'visitor',
                validationErrors: []
            });
        });
}
exports.showAddVisitorForm = (req, res, next) => {
    res.render('pages/visitors/form', {
        vis: {},
        pageTitle: req.__('visitor.form.New.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('visitor.form.New.btnLabel'),
        formAction: '/visitors/add',
        navLocation: 'visitor',
        validationErrors: []
    });
}
exports.showEditVisitorForm = (req, res, next) => {
    const visId = req.params.visId;
    visitorRepository.getVisitorById(visId)
        .then(vis => {
            res.render('pages/visitors/form', {
                vis: vis,
                formMode: 'edit',
                pageTitle: req.__('visitor.form.Edit.pageTitle'),
                btnLabel: req.__('visitor.form.Edit.btnLabel'),
                formAction: '/visitors/edit',
                navLocation: 'visitor',
                validationErrors: []
            });
        });
}
exports.showVisitorDetails = (req, res, next) => {
    const visId = req.params.visId;
    visitorRepository.getVisitorById(visId)
        .then(vis => {
            res.render('pages/visitors/form', {
                vis: vis,
                formMode: 'showDetails',
                pageTitle: req.__('visitor.form.Details.pageTitle'),
                formAction: '/visitors/details',
                navLocation: 'visitor',
                validationErrors: []
            });
        });
}
exports.addVisitor = (req, res, next) => {
    const visData = {...req.body};
    if (visData.NumberOfVisits.trim() == "") {
        visData.NumberOfVisits = null;
    }
    visitorRepository.createVisitor(visData)
        .then(result => {
            res.redirect('/visitors');
        })
        .catch(err => {
            res.render('pages/visitors/form', {
                vis: visData,
                pageTitle: req.__('visitor.form.New.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('visitor.form.New.btnLabel'),
                formAction: '/visitors/add',
                navLocation: 'visitor',
                validationErrors: err.details
            });
        });
};
exports.updateVisitor = (req, res, next) => {
    const visId = req.body._id;
    const visData = {...req.body};
    if (visData.NumberOfVisits.trim() == "") {
        visData.NumberOfVisits = null;
    }
    visitorRepository.updateVisitor(visId, visData)
        .then(result => {
            res.redirect('/visitors');
        })
        .catch(err => {
            res.render('pages/visitors/form', {
                vis: visData,
                pageTitle: req.__('visitor.form.Edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('visitor.form.Edit.btnLabel'),
                formAction: '/visitors/edit',
                navLocation: 'visitor',
                validationErrors: err.details
            });
        });
};
exports.deleteVisitor = (req, res, next) => {
    const visId = req.params.visId;
    visitorRepository.deleteVisitor(visId)
        .then(() => {
            res.redirect('/visitors');
        });
};