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
    const connectData = {

      logado: false
    };
    res.clearCookie('autenticado');
    const logoffSuccess = {
      message: 'Usuário deslogado com sucesso',
      success: 'logoff',
    };
    res.status(200).json(logoffSuccess);
    console.log('Usuário deslogado com sucesso')
  } else {
    try {
      // Tentar ler as credenciais do arquivo connect.json
      const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
      const connectData = JSON.parse(jsonData);

      // Verificar se as credenciais correspondem
      if (connectData.username === username && connectData.password === password) {
        // Autenticação com o script authenticate.sh
        const authCommand = `echo '${password}' | sudo -S ./authenticate.sh ${username}`;

        exec(authCommand, async (error, stdout, stderr) => {
          if (!error) {
            // Restante da lógica de autenticação permanece inalterado
            // ...

            // Configurar o cookie na sessão
            res.cookie('autenticado', true, { httpOnly: true });

            const authSuccess = {
              message: 'Usuário autenticado com sucesso',
              success: 'autenticado',
            };
            res.status(200).json(authSuccess);
            console.log(`Usuário: ${username} e senha:${password} autenticado com sucesso`)
          } else {
            const errorResponse = {
              message: 'Erro ao executar o script',
              error: error.message,
              stderr: stderr,
            };
            res.status(500).json(errorResponse);
            console.error('Erro ao executar o script:', error);
            console.error('Saída de erro:', stderr);
          }
        });
      } else {
        // Credenciais incorretas
        const authError = {
          message: 'Usuário ou senha incorretos',
        };
        res.status(401).json(authError);
        console.log('Usuário ou senha incorretos')
      }
    } catch (readError) {
      if (readError.code === 'ENOENT') {
        // Se o arquivo connect.json não existir, criar e salvar as credenciais
        const connectData = {
          username,
          password,
          timestamp: new Date().toISOString(),
          logado: true
        };

        try {
          // Criar o diretório se não existir
          await fs.mkdir(jsonDirPath, { recursive: true });

          // Salvar as credenciais no arquivo connect.json
          await fs.writeFile(jsonFilePath, JSON.stringify(connectData, null, 2));

          // Autenticação com o script authenticate.sh
          const authCommand = `echo '${password}' | sudo -S ./authenticate.sh ${username}`;

          exec(authCommand, async (error, stdout, stderr) => {
            if (!error) {
              // Restante da lógica de autenticação permanece inalterado
              // ...

              // Configurar o cookie na sessão
              res.cookie('autenticado', true, { httpOnly: true });
              res.cookie('username', username, { httpOnly: true });

              const authSuccess = {
                message: 'Usuário autenticado com sucesso',
                success: 'autenticado',
              };
              res.status(200).json(authSuccess);
            } else {
              const errorResponse = {
                message: 'Erro ao executar o script',
                error: error.message,
                stderr: stderr,
              };
              res.status(500).json(errorResponse);
              console.error('Erro ao executar o script:', error);
              console.error('Saída de erro:', stderr);
            }
          });
        } catch (writeError) {
          // Lidar com erros ao criar ou salvar o arquivo connect.json
          console.error('Erro ao criar ou salvar o arquivo connect.json:', writeError);
          const errorResponse = {
            message: 'Erro ao criar ou salvar o arquivo connect.json',
            error: writeError.message,
          };
          res.status(500).json(errorResponse);
        }
      } else {
        // Lidar com outros erros de leitura, se necessário
        console.error('Erro ao ler connect.json:', readError);
        const errorResponse = {
          message: 'Erro ao ler connect.json',
          error: readError.message,
        };
        res.status(500).json(errorResponse);
      }
    }
  }
});

router.get('/verificar-login', async (req, res) => {
  try {
    const autenticado = req.cookies.autenticado === 'true';

    if (autenticado) {
      const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
      const connectData = JSON.parse(jsonData);

      // Aqui, você pode adicionar o username ao response.json
      res.json({ logado: true, username: connectData.username });
      console.log(`Permanece autenticado como ${connectData.username}`);
    } else {
      res.json({ logado: false });
    }
  } catch (error) {
    console.error('Erro ao verificar o login:', error);
    res.status(500).json({ error: 'Erro ao verificar o login' });
    console.log(`Erro ao verificar o login: ${error}`);
  }
});


module.exports = router;
