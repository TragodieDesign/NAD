const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;
app.use(cors({
  origin: '*', // Substitua pela origem do seu aplicativo React
}));
// Middleware para analisar cookies
app.use(cookieParser());
// Middleware para analisar o corpo da requisição JSON
app.use(express.json());

// Importe e use os módulos de autenticação, verificação de conexão e exportação de JSON
const authRouter = require('./auth');
const networkRouter = require('./network');
const makeJsonRouter = require('./make-json');
const synthWifiRouter = require('./synth-wifi');

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
