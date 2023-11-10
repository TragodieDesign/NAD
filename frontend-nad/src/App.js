import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/login/Login';
import RemoteAcess from './components/remote/RemoteAcess'; // Importe o componente RemoteAcess aqui

const VerificarConexao = () => {
  const [conectado, setConectado] = useState(false);
  const [exibirLogin, setExibirLogin] = useState(false);
  const [exibirMensagem, setExibirMensagem] = useState(true);

  useEffect(() => {
    const verificarConexao = async () => {
      try {
        const response = await axios.get('http://localhost:3003/network');
        if (response.data && response.data.success) {
          setConectado(true);
          setTimeout(() => {
            setExibirLogin(true);
            setExibirMensagem(false);
          }, 3000);
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

  const handleLoginSuccess = () => {
    setExibirLogin(false); // Ocultar o componente de login
    // Outras ações, se necessário
  };

  return (
    <div>
      {exibirMensagem && conectado ? <p>Conexão estabelecida</p> : null}

      {exibirLogin ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <RemoteAcess />
      )}
    </div>
  );
};

export default VerificarConexao;
