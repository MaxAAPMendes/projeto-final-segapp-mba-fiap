const bodyParser = require('body-parser');
const rotasUsuarios = require('./users');
const rotasLogin = require('./login');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(rotasUsuarios);
  app.use(rotasLogin);

  app.get('/', (req, res) => {
    res
    .status(200)
    .send({
        status: 'OK',
        mensage: 'Servidor Rodando e disponível!',
    })
  })
}