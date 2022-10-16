const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Validando o token...')
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decode;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 'erro',
      mensagem: 'Falha na autenticação'
    })
  }
}