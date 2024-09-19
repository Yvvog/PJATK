const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contractsController');
router.get('/', contractsController.showContractsList);
router.get('/add', contractsController.showAddContractForm);
router.get('/edit/:contrId', contractsController.showEditContractForm);
router.get('/details/:contrId', contractsController.showContractDetails);
router.post('/add', contractsController.addContract);
router.post('/edit', contractsController.updateContract);
router.get('/delete/:contrId', contractsController.deleteContract);
module.exports = router;