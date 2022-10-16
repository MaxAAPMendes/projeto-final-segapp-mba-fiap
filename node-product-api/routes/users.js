const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.post('/users/cadastro', UserController.cadastrarUsuario);

module.exports = router;