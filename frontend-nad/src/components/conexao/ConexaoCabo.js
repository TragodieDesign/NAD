// ConexaoCabo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConexaoCabo = ({ onConexaoEstabelecida }) => {
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    const verificarConexao = async () => {
      try {
        const response = await axios.get('http://localhost:3003/network');
        if (response.status === 200) {
          setConectado(true);
          onConexaoEstabelecida();
        } else {
          // Continua verificando a cada 2 segundos se a conexão foi estabelecida
          setTimeout(verificarConexao, 2000);
        }
      } catch (error) {
        // Continua verificando a cada 2 segundos se a conexão foi estabelecida
        setTimeout(verificarConexao, 2000);
      }
    };

    verificarConexao();
  }, [onConexaoEstabelecida]);

  return <div className="Instrucoes">{conectado ? null : <div className="aguardando">Aguardando conexão...</div>}</div>;
};

export default ConexaoCabo;
