const VisitorRepository = require('../repository/mysql2/VisitorRepository');
exports.getVisitors = (req, res, next) => {
    VisitorRepository.getVisitors()
        .then(visitors => {
            res.status(200).json(visitors);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getVisitorById = (req, res, next) => {
    const visId = req.params.visId;
    VisitorRepository.getVisitorById(visId)
        .then(vis => {
            if (!vis) {
                res.status(404).json({
                    message: 'Visitor with id: ' + visId + ' not found'
                })
            } else {
                res.status(200).json(vis);
            }
        });
};
exports.createVisitor = (req, res, next) => {
    VisitorRepository.createVisitor(req.body)
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
exports.updateVisitor = (req, res, next) => {
    const visId = req.params.visId;
    VisitorRepository.updateVisitor(visId, req.body)
        .then(result => {
            res.status(200).json({message: 'Visitor updated!', vis: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteVisitor = (req, res, next) => {
    const visId = req.params.visId;
    VisitorRepository.deleteVisitor(visId)
        .then(result => {
            res.status(200).json({message: 'Removed visitor', vis: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};