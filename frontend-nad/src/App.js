import './App.css';
import React, { useState,useEffect } from 'react';
import TelaInicial from './components/inicial/TelaInicial';
import Login from './components/login/Login';
import RemoteForm from './components/remote/RemoteForm';
import axios from 'axios';
import VerificarConexao from './components/conexao/VerificarConexao';



//require('dotenv').config()
console.log(`Teste ${process.env.REACT_APP_IP_BACK}`)

const ipLocal = (process.env.REACT_APP_IP_BACK)
console.log(`O IP do backend é ${process.env.REACT_APP_IP_BACK}`)

/*
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  config => {
    // Obtém os cookies do navegador
    const cookies = document.cookie;

    // Adiciona os cookies ao cabeçalho da requisição
    config.headers.Cookie = cookies;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

*/
axios.defaults.withCredentials = true;

const App = () => {
  


console.log(ipLocal)

  const [mostrarTelaInicial, setMostrarTelaInicial] = useState(true);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRemoteForm, setMostrarRemoteForm] = useState(false);
  const [exibirVerificarConexao, setExibirVerificarConexao] = useState(false);
  const [exibirMensagem, setExibirMensagem] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [logado, setLogado] = useState(false);


  const [username, setUsername] = useState('');


  const verificarLoginPeriodico = () => {
    // Função para verificar o login e atualizar o estado logado
    const verificarLogin = async () => {
      try {
        const response = await axios.get(`${ipLocal}/auth/verificar-login`);
        setLogado(response.data.logado);
      } catch (error) {
        console.error('Erro ao verificar o login:', error);
      }
    };

    verificarLogin();
  };

//useEffect(() => {
    // Verificar o login imediatamente ao montar o componente
   // verificarLoginPeriodico();

    // Configurar verificação contínua a cada 5 segundos (ajuste conforme necessário)
   // const intervalId = setInterval(verificarLoginPeriodico, 5000);

    // Limpar o intervalo ao desmontar o componente
   // return () => clearInterval(intervalId);
 // }, []);
  

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
    setLogado(false);
  };

  const handleRemoteAccess = () => {
    setExibirVerificarConexao(false);
    setMostrarTelaInicial(false);
    setMostrarLogin(false);
    setMostrarRemoteForm(true);
  };

  const handleVoltar = () => {
    setMostrarTelaInicial(true);
    setMostrarLogin(false);
    setMostrarRemoteForm(false);
    setExibirVerificarConexao(false);
  };

  return (
 <div>
<div className='main'>
<div className='header'>
        <img src='logo-nb.png'></img>
        <h1>Nublify Smart Device</h1>
      </div>
<div className="grade">

    <div className="body-app">

      {handleExibirVerificarConexao  && (
        <VerificarConexao
         
          exibirVerificarConexao={exibirVerificarConexao}
          logado={logado} // Passa a prop logado para o componente TelaInicial
        />
      )}

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

      {exibirMensagem && <p>{mensagem}</p>}


    </div>
    </div>
</div>
<div className='sidebar'>

</div>


 </div>
  );
};

export default App;
