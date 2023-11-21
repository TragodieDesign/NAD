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
router.get('/', (req, res) => {
  checkInternetConnection((isOnline) => {
    if (!isOnline) {
      wifi.init({
        iface: null // network interface, choose a random wifi interface if set to null
      });
      wifi.scan((error, networks) => {
        if (error) {
          console.log(error);
          const errorResponse = {
            message: 'Erro ao escanear redes Wi-Fi',
            error: 'Ocorreu um erro ao escanear as redes Wi-Fi disponíveis.'
          };
          res.status(500).json(errorResponse);
        } else {
          const wifiList = networks.map(network => ({
            ssid: network.ssid,
            bssid: network.bssid,
            channel: network.channel,
            frequency: network.frequency,
            signal_level: network.signal_level,
            quality: network.quality,
            security: network.security,
            security_flags: network.security_flags,
            mode: network.mode
          }));

          const response = {
            message: 'Sem conexão com a internet',
            error: 'Não há conexão com a internet disponível.',
            wifiList: wifiList
          };

          res.status(400).json(response);
          console.log('Sem conexão com a internet');
        }
      });
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

router.post('/disconnect', (req, res) => {
  wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
  });
  wifi.disconnect(error => {
    if (error) {
      console.log(error);
      const errorResponse={
        error: 'Não foi possível se desconectar'
      }
      res.status(500).json(errorResponse)
    } else {
      console.log('Disconnected');
      const successMessage={
        success:'Desconectado com sucesso'
      }
      res.status(200).json(successMessage)
    }
  });
  
});

// Rota para autenticar em uma rede Wi-Fi com base no JSON recebido
router.post('/authenticate', (req, res) => {
  const { ssid, password } = req.body;

  wifi.connect({ ssid, password }, (error) => {
    if (error) {
      console.log(error);
      const errorResponse = {
        message: 'Erro ao conectar à rede Wi-Fi',
        error: 'Ocorreu um erro ao tentar se conectar à rede Wi-Fi.'
      };
      res.status(500).json(errorResponse);
    } else {
      const successMessage = {
        message: 'Conectado à rede Wi-Fi com sucesso',
        success: 'Conectado à rede Wi-Fi com sucesso.'
      };
      res.status(200).json(successMessage);
      console.log('Conectado à rede Wi-Fi com sucesso');
    }
  });
});

module.exports = router;