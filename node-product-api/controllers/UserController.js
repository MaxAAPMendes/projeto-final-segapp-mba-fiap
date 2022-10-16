const database = require('../db');

class UserController {

  static async cadastrarUsuario(req, res, next) {
    const { email, senha } = req.body;
    if (!email.includes('@')) {
      res.status(401).send({
        status: 'erro',
        mensagem: 'E-mail no formato inválido. Não foi possível cadastrar usuário!',
      })
      return;
    }
    if (String(senha).length < 8 || !senha.match(/^[A-Za-z0-9]+$/)) {
      res.status(400).send({
        status: 'erro',
        mensagem: `Senha no formato inválida.
        Senha deve ter no mínimo 8 dígitos. 
        Possuir pelo menos uma letra maiúscula, uma minúscula e um número.`,
      })
      return;
    }
    try {
      const resultado = await database.cadastrarUsuario(email, senha);
      res.status(201).send(resultado);
    } catch (error) {
      res
      .status(500)
      .send({
        status: 'error',
        mensagem: `Erro ao cadastrar usuário ${error.message}`
      });
    }
  }
}

module.exports = UserController;