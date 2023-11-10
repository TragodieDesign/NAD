import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerificarConexao = () => {
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    const verificarConexao = async () => {
      try {
        const response = await axios.get('http://localhost:3003/network');
        if (response.data && response.data.success) {
          setConectado(true);
          
        } else {
          setConectado(false);
          
        }
      } catch (error) {
        console.error('Erro ao verificar a conexão', error);
        setConectado(false);
      }
    };

    verificarConexao();
  }, []);

  return (
    <div>
      {conectado ? <p>Conexão estabelecida</p> : <p>Sem conexão novamente</p>}
    </div>
  );
};

export default VerificarConexao;