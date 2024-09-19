const express = require('express');
const router = express.Router();

const visApiController = require('../../api/VisitorAPI');

router.get('/', visApiController.getVisitors);
router.get('/:visId', visApiController.getVisitorById);
router.post('/', visApiController.createVisitor);
router.put('/:visId', visApiController.updateVisitor);
router.delete('/:visId', visApiController.deleteVisitor);

module.exports = router;