const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const cookieParser = require('cookie-parser');

const jsonDirPath = path.join(__dirname, '.', 'connect');
const jsonFilePath = path.join(jsonDirPath, 'connect.json');

const authenticateUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    const authCommand = `echo '${password}' | sudo -S ./authenticate.sh ${username}`;

    exec(authCommand, async (error, stdout, stderr) => {
      if (!error) {
        if (!stdout.includes('Falha na autenticação')) {
          const connectData = {
            username,
            password,
            authenticated: true,
            timestamp: new Date().toISOString(),
          };

          try {
            await fs.mkdir(jsonDirPath, { recursive: true });
            await fs.writeFile(jsonFilePath, JSON.stringify(connectData, null, 2));

            resolve({
              message: 'autenticado',
              success: 'autenticado',
            });
          } catch (writeError) {
            reject({
              message: 'Erro ao salvar o arquivo JSON.',
              error: writeError,
            });
          }
        } else {
          reject({
            message: 'Erro de autenticação',
            incorrect: 'Usuário ou senha incorretos',
          });
        }
      } else {
        reject({
          message: 'Erro ao executar o script',
          error: error.message,
          stderr: stderr,
        });
      }
    });
  });
};

module.exports = authenticateUser;
