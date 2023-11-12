// VerificarConexao.js
import React, { useState } from 'react';
import ConexaoCabo from './ConexaoCabo';
import ConexaoWifi from './ConexaoWifi';
import axios from 'axios';

const VerificarConexao = ({ onConexaoEstabelecida }) => {
  const [exibirConexaoCabo, setExibirConexaoCabo] = useState(false);
  const [exibirConexaoWifi, setExibirConexaoWifi] = useState(false);

  const handleConexaoCabo = () => {
    setExibirConexaoCabo(true);
  };

  const handleConexaoWifi = () => {
    setExibirConexaoWifi(true);
  };

  const handleConexaoFinalizada = async () => {
    try {
      const response = await axios.get('http://localhost:3003/network');
      if (response.status === 200) {
        onConexaoEstabelecida();
      }
    } catch (error) {
      console.error('Erro ao verificar conexão:', error);
    }
  };

  return (
    <div>
      {!exibirConexaoCabo && !exibirConexaoWifi && (
        <div>
          <button onClick={handleConexaoCabo}>Conectar com cabo</button>
          <button onClick={handleConexaoWifi}>Conectar com Wi-Fi</button>
        </div>
      )}

      {exibirConexaoCabo && (
        <ConexaoCabo onConexaoEstabelecida={handleConexaoFinalizada} />
      )}

      {exibirConexaoWifi && (
        <ConexaoWifi onConexaoEstabelecida={handleConexaoFinalizada} />
      )}
    </div>
  );
};

export default VerificarConexao;
