// configIP.js

import axios from 'axios';

const checkLocalhost = async () => {
  try {
    // Tenta fazer uma requisição para http://localhost:3003/network
    await axios.get('http://localhost:3003/network');
    // Se a requisição for bem-sucedida, retorna o IP como localhost
    return 'http://localhost';
  } catch (error) {
    // Se a requisição falhar, retorna o IP configurado no ambiente
    return process.env.REACT_APP_IP_BACK;
  }
};

export default checkLocalhost;

