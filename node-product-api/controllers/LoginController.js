const database = require('../db');
const UserController = require('./UserController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
  static async logar(req, res, next) {
    console.log('Executando o método logar...');
    const { email, senha } = req.body;
    if (!email.includes('@')) {
      res.status(400).send({
        status: 'erro',
        mensagem: 'Falha na autenticação. Dados inválidos. Não foi possível logar',
      })
      return;
    }
    const usuariosEncontrados = await database.pesquisarUsuario(email);
    const { status, usuarios } = usuariosEncontrados;
    if ((usuarios && !usuarios.length) || status === "erro") {
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
      if (resposta) {
        const token = jwt.sign({
          idUser: usuarios[0].id,
          emailUser: usuarios[0].email,
        }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        return res
          .status(200)
          .send({
            status: 'sucesso',
            mensagem: 'Usuário autenticado com sucesso!',
            token,
          })
      }
    });
  }
};

module.exports = LoginController;
