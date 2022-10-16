const ratelimit = require('express-rate-limit');

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
	max: 100, // limite de requisições para cada IP em 15 minutos
	standardHeaders: true, // retorn no header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Limite de requisições permitidas excedido.'
});

module.exports = limiter;
