const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

// Middleware para permitir o parsing do corpo da requisição como JSON
router.use(express.json());

// Caminho para o diretório e arquivo JSON
const jsonDirPath = path.join(__dirname, '.', 'connect'); // Substitua '..' pelo caminho adequado
const jsonFilePath = path.join(jsonDirPath, 'connect.json');

// Comando para executar o script Bash com sudo
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        const error = {
            message: 'É necessário fornecer username e password no corpo da requisição.',
        };
        return res.status(400).json(error);
    }

    const authCommand = `echo '${password}' | sudo -S ./authenticate.sh ${username}`;

    exec(authCommand, async (error, stdout, stderr) => {
        if (!error) {
            if (!stdout.includes('Falha na autenticação')) {
                // Se a autenticação for bem-sucedida, gera o arquivo JSON
                const connectData = {
                    username,
                    password,
                    authenticated: true,
                    timestamp: new Date().toISOString(),
                };

                try {
                    // Cria o diretório se não existir
                    await fs.mkdir(jsonDirPath, { recursive: true });

                    // Grava o arquivo JSON
                    await fs.writeFile(jsonFilePath, JSON.stringify(connectData, null, 2));

                    const authSuccess = {
                        message: 'autenticado',
                        success: 'autenticado',
                    };
                    res.status(200).json(authSuccess);
                } catch (writeError) {
                    const errorResponse = {
                        message: 'Erro ao salvar o arquivo JSON.',
                    };
                    res.status(500).json(errorResponse);
                    console.error('Erro ao salvar o arquivo JSON:', writeError);
                }
            } else {
                const errorResponse = {
                    message: 'Erro de autenticação',
                    incorrect: 'Usuário ou senha incorretos'
                };
                res.status(400).json(errorResponse);
            }
        } else {
            const errorResponse = {
                message: 'Erro ao executar o script',
                error: error.message,
                stderr: stderr
            };
            res.status(500).json(errorResponse);
            console.error('Erro ao executar o script:', error);
            console.error('Saída de erro:', stderr);
        }
    });
});

module.exports = router;
