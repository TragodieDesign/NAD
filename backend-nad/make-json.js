// make-json.js

const express = require('express');
const router = express.Router();

// Rota para exportar JSON
router.get('/', (req, res) => {
  // Verifique se o usuário está autenticado usando o cookie
  if (req.cookies.autenticado) {
    // Gere o JSON e envie-o como resposta
    const data = { exemplo: 'dados' };
    res.json(data);
  } else {
    res.status(401).send('Não autenticado.');
  }
});

module.exports = router;
