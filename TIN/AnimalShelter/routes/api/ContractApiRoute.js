const express = require('express');
const router = express.Router();

const contrApiController = require('../../api/ContractAPI');

router.get('/', contrApiController.getContracts);
router.get('/:contrId', contrApiController.getContractById);
router.post('/', contrApiController.createContract);
router.put('/:contrId', contrApiController.updateContract);
router.delete('/:contrId', contrApiController.deleteContract);

module.exports = router;