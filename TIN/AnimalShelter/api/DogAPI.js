const DogRepository = require('../repository/mysql2/DogRepository.js');

exports.getDogs = (req, res, next) => {
    DogRepository.getDogs()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getDogById = (req, res, next) => {
    const dogId = req.params.dogId;
    DogRepository.getDogById(dogId)
        .then(dog => {
            if (!dog) {
                res.status(404).json({
                    message: 'Dog with id: ' + dogId + ' not found'
                })
            } else {
                res.status(200).json(dog);
            }
        });
};
exports.createDog = (req, res, next) => {
    DogRepository.createDog(req.body)
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
exports.updateDog = (req, res, next) => {
    const dogId = req.params.dogId;
    DogRepository.updateDog(dogId, req.body)
        .then(result => {
            res.status(200).json({message: 'Dog updated!', dog: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteDog = (req, res, next) => {
    const dogId = req.params.dogId;
    DogRepository.deleteDog(dogId)
        .then(result => {
            res.status(200).json({message: 'Removed dog', dog: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};