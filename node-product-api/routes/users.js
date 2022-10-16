const { Router } = require('express');
const login = require('../middleware/login');
const UserController = require('../controllers/UserController');

const router = Router();

router.post('/users/cadastro', login, UserController.cadastrarUsuario);

module.exports = router;