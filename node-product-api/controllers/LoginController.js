const database = require('../db');
const UserController = require('./UserController');
const bcrypt = require('bcrypt');

class LoginController {
  static async logar(req, res, next) {
    console.log('Executando o metodo logar...');
    const { email, senha } = req.body;
    const usuariosEncontrados = await database.pesquisarUsuario(email);
    const { status, usuarios } = usuariosEncontrados;
    if (usuarios && !usuarios.length) {
      res.status(401).send({
          status,
          mensagem: 'Falha na autenticação. Não foi possível logar',
        });
      return;
    }
    bcrypt.compare(String(senha), usuarios[0].senha, (error, resposta) => {
      if (error) {
        return res
          .status(401)
          .send({
            status: 'erro',
            mensagem: 'Falha na autenticação. Não foi possível logar',
          });
      }
      return res
        .status(200)
        .send({
          status: 'sucesso',
          mensagem: 'Usuário autenticado com sucesso!',
        })
    });
  }
};

module.exports = LoginController;
