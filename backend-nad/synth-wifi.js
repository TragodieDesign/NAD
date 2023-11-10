// synth-wifi.js
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

const senhaPadrao = '123';
const wifiInfo = {
  ssid: '',
  senha: '',
  redes: [] // Adicionando uma propriedade para armazenar a lista de redes WiFi
};

// Rota para obter as informações do WiFi (GET)
router.get('/', async (req, res) => {
  try {
    // Lê o arquivo JSON (substitua './redes-sinteticas.json' pelo caminho real do seu arquivo)
    const jsonFileContent = await fs.readFile('./redes-sinteticas.json', 'utf-8');
    const jsonData = JSON.parse(jsonFileContent);

    // Atualiza as informações do WiFi com os dados do arquivo JSON
    wifiInfo.ssid = jsonData.ssid;
    wifiInfo.senha = jsonData.senha;
    wifiInfo.redes = jsonData.networks || []; // Assumindo que as redes estão em um array chamado "networks"

    res.status(200).json({
      ssid: wifiInfo.ssid,
      redes: wifiInfo.redes, // Adicionando as redes WiFi à resposta
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
    const { senha, ssid } = req.body;

    // Verifica se a senha fornecida corresponde à senha padrão
    if (senha !== senhaPadrao) {
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
