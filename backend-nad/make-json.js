const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config();





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
// Função para criar o conteúdo do arquivo .xinitrc com base no connectionType e gateway
function criarConteudoXinitrc(jsonData) {
  if (jsonData.connectionType === 'WEB') {
    return `#!/usr/bin/env bash
#Conexao WEB
xset -dpms && xset s off && xset s noblank && unclutter & exec /usr/bin/chromium -kiosk -url ${jsonData.host}
/w:${process.env.WIDTH} /h:${process.env.HEIGTH} 
`;
  } else if (jsonData.connectionType === 'RDP' && !jsonData.gateway) {
    return `#!/usr/bin/env bash
#conexao RDP sem gateway
xset -dpms && xset s off && xset s noblank && xfreerdp /v:${jsonData.host} /u:${jsonData.remoteUser} /p:${jsonData.remotePassword} /cert-ignore /sound /microphone
/w:${process.env.WIDTH} /h:${process.env.HEIGTH} 
`;
  } else if (jsonData.connectionType === 'RDP' && jsonData.gateway) {
    return `#!/usr/bin/env bash
#conexao RDP com gateway
xset -dpms && xset s off && xset s noblank && xfreerdp /v:${jsonData.hostGateway} /g:${jsonData.host} /gu:${jsonData.loginGateway} /gp:${jsonData.passwordGateway} /u:${jsonData.remoteUser} /p:${jsonData.remotePassword}
/w:${process.env.WIDTH} /h:${process.env.HEIGTH} 

`;

  } else {
    
    return 'erro na criação'; 
  }
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

      
      const xinitrcContent = criarConteudoXinitrc(jsonData);
      if (xinitrcContent) {
        const xinitrcFilePath = __dirname + '/connect/.xinitrc';
        await fs.writeFile(xinitrcFilePath, xinitrcContent);
        console.log('Arquivo .xinitrc criado com sucesso.');
      }
      
      
      
      
      res.send('Dados adicionados com sucesso!');
      console.log(jsonData)
      

      // Executar o comando sudo reboot now
      /*
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


      */


    } else {
      res.status(401).send('Não autenticado.');
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo JSON:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
