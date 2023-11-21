// synth-wifi.js
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

const senhaPadrao = '123';
const wifiInfo = {
  ssid: '',
  password: '',
  wifiList: [] // Mantendo a propriedade como wifiList
};

// Rota para obter as informações do WiFi (GET)
router.get('/', async (req, res) => {
  try {
    // Lê o arquivo JSON (substitua './redes-sinteticas.json' pelo caminho real do seu arquivo)
    const jsonFileContent = await fs.readFile('./redes-sinteticas.json', 'utf-8');
    const jsonData = JSON.parse(jsonFileContent);

    // Atualiza as informações do WiFi com os dados do arquivo JSON
    wifiInfo.ssid = jsonData.ssid;
    wifiInfo.password = jsonData.password;
    wifiInfo.wifiList = jsonData.wifiList || []; // Mantendo a propriedade como wifiList

    res.status(200).json({
      ssid: wifiInfo.ssid,
      wifiList: wifiInfo.wifiList, // Mantendo a propriedade como wifiList
      message: 'Informações do WiFi obtidas com sucesso!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para configurar o WiFi (POST)
router.post('/', async (req, res) => {
  try {
    const { password, ssid } = req.body;

    // Verifica se a senha fornecida corresponde à senha padrão
    if (password !== senhaPadrao) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Atualiza as informações do WiFi com o SSID fornecido
    wifiInfo.ssid = ssid;

    // Pode adicionar lógica adicional, como salvar em um arquivo ou banco de dados

    res.status(200).json({ message: 'WiFi configurado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
