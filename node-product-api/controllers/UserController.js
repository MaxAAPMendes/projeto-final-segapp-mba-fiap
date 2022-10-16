const database = require('../db');

class UserController {
  static async cadastrarUsuario(req, res, next) {
    const { email, senha } = req.body;
    try {
      const resultado = await database.cadastrarUsuario(email, senha);
      console.log(resultado);
      res.status(201).send(resultado);
      // res.status(200).send({
      //   status: 'sucesso',
      //   mensagem: `usuário cadastrado com sucesso ${email} ${senha}`
      // })
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


// async (res, req, next) => {
//   const { email, senha } = req.body;
//   console.log('email e senha repassados', email, senha)
//   const resultado = await db.cadastrarUsuario(email, senha)
//     res.status(200).json(resultado);
// }