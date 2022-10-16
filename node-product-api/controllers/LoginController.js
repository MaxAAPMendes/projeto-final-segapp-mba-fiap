const database = require('../db');
const UserController = require('./UserController');

class LoginController {
  static async logar(req, res, next) {
    console.log('Executando o metodo logar...');
    const { email, senha } = req.body;
    const usuariosEncontrados = await database.pesquisarUsuario(email);
    const { status, usuarios } = usuariosEncontrados;
    if (usuarios && !usuarios.length) {
      res.status(401).send({
          status: 'error',
          mensagem: 'Falha na autenticação. Não foi possível logar',
        });
      return;
    }
    try {
      res.status(200).send({
        status,
        mensagem: usuarios,
      });
    } catch (error) {
      console.log('Erro não foi possível logar!');
      res.status(500).send({
        status: 'erro',
        mensagem: 'Erro não foi possível logar!'
      });
    }
  }
};

module.exports = LoginController;
