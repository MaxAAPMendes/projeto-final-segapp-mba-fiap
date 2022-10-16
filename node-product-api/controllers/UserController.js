const database = require('../db');

class UserController {

  static async cadastrarUsuario(req, res, next) {
    const { email, senha } = req.body;
    try {
      const resultado = await database.cadastrarUsuario(email, senha);
      console.log(resultado);
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