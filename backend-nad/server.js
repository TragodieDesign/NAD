const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv'); // para pegar o hostname
const { exec } = require('child_process');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;


exec('../set_ip.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao executar set_ip.sh: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erro ao executar set_ip.sh: ${stderr}`);
    return;
  }
  console.log(`IP identificado com sucesso! Saída do set_ip.sh: ${stdout}`);
});
const ipLocal = process.env.IP_FRONT 

app.use(cors({
  origin: ipLocal,
  credentials: true,
  exposedHeaders: 'Set-Cookie',

}));


app.get('/set-cookie', (req, res) => {
  // Configuração do cookie com o nome "app-auth"
  res.cookie('app-auth', 'valorDoCookie', {
    // Opções do cookie (ajuste conforme necessário)
    sameSite: 'None',  
    secure: true,      
  });

  res.send('Cookie "app-auth" definido com sucesso!');
});

// Middleware para analisar cookies
app.use(cookieParser());

// Middleware para analisar o corpo da requisição JSON
app.use(express.json());

//Importar rotas
const authRouter = require('./auth');
const networkRouter = require('./network');
const makeJsonRouter = require('./make-json');
const synthWifiRouter = require('./synth-wifi');

//definir rotas

app.use('/auth', authRouter);
app.use('/network', networkRouter);
app.use('/make-json', makeJsonRouter);
app.use('/synth-wifi', synthWifiRouter);

// Rota raiz que retorna "Servidor funcionando"
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
