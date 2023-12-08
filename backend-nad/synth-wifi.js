// synth-wifi.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')




router.get('/', async (req, res) => {
  const filePath = path.join(__dirname, 'connect', 'connect.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo connect/connect.json:', err);
      return res.status(500).send('Erro interno do servidor');
    }

    try {
      const connectData = JSON.parse(data);

      if (connectData && connectData.host) {
        res.json({ host: connectData.host });
      } else {
        res.status(400).send('Campo "host" não encontrado no arquivo connect/connect.json');
      }
    } catch (error) {
      console.error('Erro ao fazer parse do JSON:', error);
      res.status(500).send('Erro interno do servidor');
    }
  });
});




  module.exports = router;
