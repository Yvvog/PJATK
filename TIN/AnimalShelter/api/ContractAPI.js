const ContractRepository = require('../repository/mysql2/ContractRepository.js');

exports.getContracts = (req, res, next) => {
    ContractRepository.getContracts()
        .then(contrs => {
            res.status(200).json(contrs);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getContractById = (req, res, next) => {
    const contrId = req.params.contrId;
    ContractRepository.getContractById(contrId)
        .then(contr => {
            if (!contr) {
                res.status(404).json({
                    message: 'Contract with id: ' + contrId + ' not found'
                })
            } else {
                res.status(200).json(contr);
            }
        });
};
exports.createContract = (req, res, next) => {
    ContractRepository.createContract(req.body)
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
exports.updateContract = (req, res, next) => {
    const contrId = req.params.contrId;
    ContractRepository.updateContract(contrId, req.body)
        .then(result => {
            res.status(200).json({message: 'Contract updated!', contr: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteContract = (req, res, next) => {
    const contrId = req.params.contrId;
    ContractRepository.deleteContract(contrId)
        .then(result => {
            res.status(200).json({message: 'Removed contract', contr: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};