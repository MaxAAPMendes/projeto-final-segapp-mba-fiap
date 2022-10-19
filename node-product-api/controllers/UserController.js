const database = require('../db');

class UserController {

  static async cadastrarUsuario(req, res, next) {
    console.log("Controller cadastrar usuário.")
    const { email, senha } = req.body;
    if (!email || !email.includes('@')) {
      res.status(401).send({
        status: 'erro',
        mensagem: 'E-mail no formato inválido. Não foi possível cadastrar usuário!',
      })
      return;
    }
    const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@]{10,}$/);
    if (!regex.test(String(senha))) {
      res.status(422).send({
        status: 'erro',
        mensagem: `Deve conter ao menos 10 caracteres entre maiúsculas, 
        minúsculas, numéricos e caracteres especiais`,
      })
      return;
    }
    try {
      const resultado = await database.cadastrarUsuario(email, senha);
      console.log("reutado", resultado)
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