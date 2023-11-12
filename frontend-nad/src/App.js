import './App.css'; 
import React, { useState,useEffect } from 'react';
import TelaInicial from './components/inicial/TelaInicial';
import VerificarConexao from './components/conexao/VerificarConexao';
import Login from './components/login/Login';
import RemoteForm from './components/remote/RemoteForm';
import axios from 'axios';


const App = () => {
  const [mostrarTelaInicial, setMostrarTelaInicial] = useState(true);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRemoteForm, setMostrarRemoteForm] = useState(false);
  const [exibirVerificarConexao, setExibirVerificarConexao]=useState(false);
  const [exibirMensagem, setExibirMensagem] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleTelaInicial = () => {
    setMostrarTelaInicial(true);
    setMostrarLogin(false);
    setMostrarRemoteForm(false);
    setExibirVerificarConexao(false);
  };
  
  const handleExibirVerificarConexao = () => {
    setExibirVerificarConexao(true);
    setExibirMensagem(true);
    setMostrarLogin(false);
    setMostrarRemoteForm(false);
    setMostrarTelaInicial(false);
  };

  const handleLogout = () => {
    setMostrarTelaInicial(false);
    setMostrarLogin(true);
    setMostrarRemoteForm(false);
  };

  const handleRemoteAccess = () => {
    setExibirVerificarConexao(false);
    setMostrarTelaInicial(false);
    setMostrarLogin(false);
    setMostrarRemoteForm(true);
  };
  const handleVoltar=()=>{
    setMostrarTelaInicial(true);
    setMostrarLogin(false);
    setMostrarRemoteForm(false);
    setExibirVerificarConexao(false);
  }

  return (
    <div className="grade">
      
      {mostrarTelaInicial && (
        <TelaInicial
          onConexaoEstabelecida={() => handleExibirVerificarConexao(false)}          
          onLogout={handleLogout}
          onRemoteAccess={handleRemoteAccess}
          exibirVerificarConexao={handleExibirVerificarConexao}
        />
      )}

      {mostrarLogin && (
        <Login
          onLoginSuccess={() => {
            setMostrarTelaInicial(false);
            setMostrarLogin(false);
            setMostrarRemoteForm(true);
          }}
        />
      )}

      {mostrarRemoteForm && <RemoteForm />}

      {exibirMensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default App;