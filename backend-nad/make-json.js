const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const { exec } = require('child_process');

function verificaCampos(jsonData) {
  const camposObrigatorios = [
    'username',
    'password',
    'timestamp',
    'logado',
    'connectionType',
    'host',
    'remoteUser',
    'remotePassword',
    'connected'
  ];

  return camposObrigatorios.every(campo => campo in jsonData);
}

// Rota para exportar JSON e verificar campos
router.get('/get-json', async (req, res) => {
  try {
    if (req.cookies.autenticado) {
      const jsonFilePath = __dirname + '/connect/connect.json';
      const jsonData = await fs.readFile(jsonFilePath, 'utf-8');

      const parsedData = JSON.parse(jsonData);

      if (verificaCampos(parsedData)) {
        if (parsedData.logado && parsedData.connected) {
          res.json({ mensagem: 'Todos os campos presentes. Logado e conectado.' });
        } else {
          res.json({ mensagem: 'Erro na configuração da conexão remota' });
        }
      } else {
        res.status(400).json({ mensagem: 'Conexão remota não configurada' });
      }
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
      const novosDados = req.body;
      const jsonFilePath = __dirname + '/connect/connect.json';
      const jsonData = JSON.parse(await fs.readFile(jsonFilePath, 'utf-8'));

      Object.assign(jsonData, novosDados);

      await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

      res.send('Dados adicionados com sucesso!');

      // Executar o comando sudo reboot now
      const senhaSudo = jsonData.password; // Usando o campo 'password' do JSON
      if (senhaSudo) {
        exec(`echo ${senhaSudo} | sudo -S reboot now`, (err, stdout, stderr) => {
          if (err) {
            console.error('Erro ao reiniciar:', err);
          } else {
            console.log('Reiniciado com sucesso:', stdout);
          }
        });
      } else {
        console.error('Senha sudo não encontrada no JSON.');
      }
    } else {
      res.status(401).send('Não autenticado.');
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo JSON:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
