// TelaInicial.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VerificarConexao from '../conexao/VerificarConexao';
import Login from '../login/Login';
import RemoteForm from '../remote/RemoteForm';

const TelaInicial = ({ onConexaoVerificada, onLogout }) => {
  const [exibirVerificarConexao, setExibirVerificarConexao] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRemoteForm, setMostrarRemoteForm] = useState(false);
  const [exibirTelaInicial, setMostrarTelaInicial] = useState(true);

  const [username, setUsername] = useState('');
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const response = await axios.get('http://localhost:3003/auth/verificar-login');
        setLogado(response.data.logado);
        if (response.data.logado) {
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Erro ao verificar o login:', error);
      }
    };

    verificarLogin();
  }, []); // Apenas uma chamada à API quando o componente é montado

  useEffect(() => {
    console.log(`Dados: ${username} ${logado}`);
  }, [username, logado]);

  const handleTelaInicial = () => {
    setMostrarTelaInicial(true);
    setMostrarLogin(false);
    setMostrarRemoteForm(false);
    setExibirVerificarConexao(false);
  };

  const handleExibirVerificarConexao = () => {
    setExibirVerificarConexao(true);
    setMostrarLogin(false);
    setMostrarRemoteForm(false);
    setMostrarTelaInicial(false);
  };

  const handleMostrarLogin = () => {
    setExibirVerificarConexao(false);
    setMostrarLogin(true);
    setMostrarRemoteForm(false);
    setMostrarTelaInicial(false);
  };

  const handleMostrarRemoteForm = () => {
    setExibirVerificarConexao(false);
    setMostrarLogin(false);
    setMostrarRemoteForm(true);
    setMostrarTelaInicial(false);
  };

  const handleLogout = () => {
    setMostrarRemoteForm(false);
    setMostrarTelaInicial(true);
    setLogado(false);
    onLogout();
  };

  return (
    <div>
      <div className="controle">
        <button onClick={handleTelaInicial}>Voltar</button>
      </div>
      <div className={exibirTelaInicial ? 'exibir' : 'ocultar'}>
        <div className="title">
          {logado ? (
            <h1>Bem-vindo(a), {username}</h1>
          ) : (
            <h1>Seja Bem-vindo(a)!</h1>
          )}
        </div>

        <button onClick={handleExibirVerificarConexao} className='btn-conectado'>Verificar Conexão</button>
        <button onClick={handleMostrarRemoteForm} className='configurar'>Remote Form</button>
        {logado ? (
          <button onClick={handleLogout} className='logoff'>Logoff</button>
        ) : (
          <button onClick={handleMostrarLogin} className='login'>Login</button>
        )}
      </div>

      {exibirVerificarConexao && <VerificarConexao onConexaoVerificada={onConexaoVerificada} />}

      {mostrarLogin && (
        <Login
          onLoginSuccess={() => {
            setMostrarTelaInicial(false);
            setMostrarLogin(false);
            setMostrarRemoteForm(true);
            setLogado(true);
          }}
        />
      )}

      {mostrarRemoteForm && <RemoteForm />}
    </div>
  );
};

export default TelaInicial;
