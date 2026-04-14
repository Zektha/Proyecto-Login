const express = require('express');
const router = express.Router();

const controller = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.get('/register', controller.mostrarRegistro);
router.post('/register', controller.registrarUsuario);
router.get('/login', controller.mostrarLogin);
router.post('/login', controller.loginUsuario);
router.get('/dashboard', auth, controller.dashboard);
router.get('/logout', controller.logout);

module.exports = router;