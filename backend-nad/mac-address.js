const express = require('express');
const { exec } = require('child_process');
const router = express.Router();
const os = require('os');



router.get('/', (req, res) => {
    const macAddress = getMacAddress();
  
    // Verifica se o endereço MAC foi obtido com sucesso
    if (macAddress) {
      res.json({ macAddress });
    } else {
      res.status(500).json({ error: 'Não foi possível obter o endereço MAC.' });
    }
  });

  
  function getMacAddress() {
    try {
      const networkInterfaces = os.networkInterfaces();
      const firstInterface = Object.values(networkInterfaces)[0];
      const macAddressInfo = firstInterface.find(info => info.mac && info.mac !== '00:00:00:00:00:00');
      
      return macAddressInfo ? macAddressInfo.mac : null;
    } catch (error) {
      console.error('Erro ao obter o endereço MAC:', error);
      return null;
    }
  }

  module.exports = router;