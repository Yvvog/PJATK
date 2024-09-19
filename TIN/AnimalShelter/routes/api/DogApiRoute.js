const express = require('express');
const router = express.Router();

const dogApiController = require('../../api/DogAPI');

router.get('/', dogApiController.getDogs);
router.get('/:dogId', dogApiController.getDogById);
router.post('/', dogApiController.createDog);
router.put('/:dogId', dogApiController.updateDog);
router.delete('/:dogId', dogApiController.deleteDog);

module.exports = router;