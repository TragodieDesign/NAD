const express = require('express');
const router = express.Router();
const fs = require('fs').promises; // Utilizando a versão assíncrona do módulo 'fs'

// Rota para exportar JSON
router.get('/get-json', async (req, res) => {
  try {
    if (req.cookies.autenticado) {
      // Caminho do arquivo connect.json
      const jsonFilePath = __dirname + '/connect/connect.json';

      // Leia o conteúdo do arquivo connect.json
      const jsonData = await fs.readFile(jsonFilePath, 'utf-8');

      // Envie o JSON como resposta
      res.json(JSON.parse(jsonData));
    } else {
      res.status(401).send('Não autenticado.');
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo JSON:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para receber dados JSON via POST
router.post('/', async (req, res) => {
  try {
    if (req.cookies.autenticado) {
      // Obtenha os dados JSON do corpo da requisição
      const novosDados = req.body;

      // Caminho do arquivo connect.json
      const jsonFilePath = __dirname + '/connect/connect.json';

      // Leia o conteúdo do arquivo connect.json
      const jsonData = JSON.parse(await fs.readFile(jsonFilePath, 'utf-8'));

      // Adicione os novos dados ao JSON existente
      Object.assign(jsonData, novosDados);

      // Escreva os dados atualizados de volta no arquivo connect.json
      await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

      res.send('Dados adicionados com sucesso!');
    } else {
      res.status(401).send('Não autenticado.');
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo JSON:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
