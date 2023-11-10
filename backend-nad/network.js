const wifi = require('node-wifi');
const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

// Função para verificar a conexão com a internet
const checkInternetConnection = (callback) => {
  exec('ping -c 1 google.com', (error, stdout, stderr) => {
    if (error) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

// Rota para verificar a conexão com a internet e listar redes Wi-Fi
// No arquivo network.js no servidor
router.get('/', (req, res) => {
  checkInternetConnection((isOnline) => {
    if (!isOnline) {
      const error = {
        message: 'Sem conexão com a internet',
        error: 'Não há conexão com a internet disponível.'
      };
      res.status(400).json(error);
      console.log('Sem conexão com a internet');
    } else {
      const successMessage = {
        message: 'Conexão com a internet ativa',
        success: 'Há uma conexão com a internet ativa.'
      };
      res.status(200).json(successMessage);
      console.log('Conexão com a internet ativa');
    }
  });
});


module.exports = router;
