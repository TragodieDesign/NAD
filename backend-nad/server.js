const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
  exposedHeaders: 'Set-Cookie'
}));

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
