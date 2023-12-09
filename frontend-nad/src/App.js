import './App.css';
import React, { useState,useEffect } from 'react';
import TelaInicial from './components/inicial/TelaInicial';
import Login from './components/login/Login';
import RemoteForm from './components/remote/RemoteForm';
import axios from 'axios';
import VerificarConexao from './components/conexao/VerificarConexao';
//import { IPProvider, useIP } from './components/IPContext';
//import checkLocalhost from './components/configIP'
//console.log(`Teste ${process.env.REACT_APP_IP_BACK}`)

const setIpLocal = window.location.hostname || 'localhost';
const serverPort = 3003;

const ipLocal = (`http://${setIpLocal}:${serverPort}`)


console.log("Valor do IP" , ipLocal)




console.log(`O IP do frontend é ${setIpLocal}`)





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


const App = () => {








  const [mostrarTelaInicial, setMostrarTelaInicial] = useState(true);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRemoteForm, setMostrarRemoteForm] = useState(false);
  const [exibirVerificarConexao, setExibirVerificarConexao] = useState(false);
  const [exibirMensagem, setExibirMensagem] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [logado, setLogado] = useState(false);


  const [username, setUsername] = useState('');




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
    <TelaInicial />

</div>


  );
};

export default App;
