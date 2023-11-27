const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());

const jsonDirPath = path.join(__dirname, 'connect');
const jsonFilePath = path.join(jsonDirPath, 'connect.json');

router.post('/', async (req, res) => {
  const { username, password, action } = req.body;

  if (action === 'logoff') {
    res.clearCookie('autenticado');
    const logoffSuccess = {
      message: 'Usuário deslogado com sucesso',
      success: 'logoff',
    };
    res.status(200).json(logoffSuccess);
    console.log('Usuário deslogado com sucesso');
  } else {
    try {
      // Autenticação com o script authenticate.sh
      const authCommand = `echo '${password}' | sudo -S ./authenticate.sh ${username}`;

      console.log(`Executando comando de autenticação: ${authCommand}`);

      exec(authCommand, async (error, stdout, stderr) => {
        console.log('Saída padrão do comando:', stdout);
        console.error('Saída de erro do comando:', stderr);

        if (!error) {
          res.cookie('autenticado', true, { httpOnly: true });

          const authSuccess = {
            message: 'Usuário autenticado com sucesso',
            success: 'autenticado',
          };
          res.status(200).json(authSuccess);
          console.log(`Usuário: ${username} autenticado com sucesso`);

          // Criar o diretório se não existir
          await fs.mkdir(jsonDirPath, { recursive: true });

          // Salvar as credenciais no arquivo connect.json
          const connectData = {
            username,
            password,
            timestamp: new Date().toISOString(),
            logado: true
          };
          await fs.writeFile(jsonFilePath, JSON.stringify(connectData, null, 2));
        } else {
          const errorResponse = {
            message: 'Erro ao executar o script',
            error: error.message,
            stderr: stderr,
          };
          res.status(500).json(errorResponse);
          console.error('Erro ao executar o script:', error);
          const connectData = {
            username,
            timestamp: new Date().toISOString(),
            logado: false
          };
        }
      });
    } catch (error) {
      const errorResponse = {
        message: 'Erro ao autenticar o usuário',
        error: error.message,
      };
      res.status(500).json(errorResponse);
      console.error('Erro ao autenticar o usuário:', error);
    }
  }
});

router.get('/verificar-login', async (req, res) => {
  try {
    const autenticado = req.cookies.autenticado === 'true';

    if (autenticado) {
      const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
      const connectData = JSON.parse(jsonData);

      res.json({ logado: true, username: connectData.username });
      console.log(`Permanece autenticado como ${connectData.username}`);
    } else {
      res.json({ logado: false });
    }
  } catch (error) {
    console.error('Erro ao verificar o login:', error);
    res.status(500).json({ error: 'Erro ao verificar o login' });
  }
});

module.exports = router;
