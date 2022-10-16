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
    if (
      !String(senha).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})")
    ) {
      res.status(422).send({
        status: 'erro',
        mensagem: `Deve conter ao menos 10 caracteres entre maiúsculas, 
        minúsculas, numéricos e caracteres especiais`,
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