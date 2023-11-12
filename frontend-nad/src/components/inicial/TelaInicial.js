// TelaInicial.js
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import VerificarConexao from '../conexao/VerificarConexao';
import Login from '../login/Login';
import RemoteForm from '../remote/RemoteForm';

const TelaInicial = ({ onConexaoVerificada, loggedIn, onLogout }) => {
  const [exibirVerificarConexao, setExibirVerificarConexao] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRemoteForm, setMostrarRemoteForm] = useState(false);
  
  const [exibirTelaInicial,  setMostrarTelaInicial] = useState(true);

  const classeDaTelaInicial = exibirTelaInicial ? 'exibir' : 'ocultar';

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

  const handlemostrarLogin = () => {
    setExibirVerificarConexao(false);
    setMostrarLogin(true);
    setMostrarRemoteForm(false);
     setMostrarTelaInicial(false);
  };

  const handlemostrarRemoteForm = () => {
    setExibirVerificarConexao(false);
    setMostrarLogin(false);
    setMostrarRemoteForm(true);
     setMostrarTelaInicial(false);
  };

  return (
    <div>
      <div className='controle'><button onClick={handleTelaInicial}>Voltar</button></div>
      <div className={classeDaTelaInicial}>
      <div className='title'>
        <h1>Bem vindo(a)</h1>
      </div>

      <button onClick={handleExibirVerificarConexao}>Verificar Conexão</button>
      <button onClick={handlemostrarLogin}>Login</button>
      <button onClick={handlemostrarRemoteForm}>Remote Form</button>
      </div>

      


      {exibirVerificarConexao && (
        <VerificarConexao onConexaoVerificada={onConexaoVerificada} />
      )}

      {mostrarLogin && (
        <Login
          onLoginSuccess={() => {
            // Lógica após o sucesso do login
            console.log('Login bem-sucedido');
            // Exemplo: redirecionar para outra página ou atualizar o estado de loggedIn
          }}
          onLoginError={(mensagem) => console.error('Erro no login:', mensagem)}
        />
      )}

      {mostrarRemoteForm && <RemoteForm />}
    </div>
  );
};

export default TelaInicial;