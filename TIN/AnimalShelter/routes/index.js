var express = require('express');
var router = express.Router();
const langController = require('../controllers/langController');
router.get('/changeLang/:lang', langController.changeLang);

router.get('/', function (req, res, next) {
    res.render('index', {navLocation: 'main'});
});
const AuthController = require('../controllers/authController');
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;