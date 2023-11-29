// TelaInicial.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VerificarConexao from '../conexao/VerificarConexao';
import Login from '../login/Login';
import RemoteForm from '../remote/RemoteForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet, faWifi,faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip as ReactTooltip } from 'react-tooltip'


const ipLocal = (process.env.REACT_APP_IP_BACK)




const TelaInicial = ({ onConexaoEstabelecida, }) => {
  const [conectado, setConectado] = useState(false);
  const [exibirVerificarConexao, setExibirVerificarConexao] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRemoteForm, setMostrarRemoteForm] = useState(false);
  const [exibirTelaInicial, setMostrarTelaInicial] = useState(true);

  const [username, setUsername] = useState('');
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const response = await axios.get(`${ipLocal}/auth/verificar-login`);
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

  const handleConexaoEstabelecida= async ()=>{
    try {
      const response = await axios.get(`${ipLocal}/network`);
      if (response.status === 200) {
        setConectado(true);
        console.log(`com internet`)
        if (setConectado){
          console.log("set conectado resolvido")
        }else{
          console.log("nao resolvido")
        }
      }
    } catch (error) {
      console.error('Sem internet:', error);
    }
  };

  const onLogout = () =>{
    const data = {
      action: 'logoff',
  }
  axios
  .post(`${ipLocal}/auth/logoff`, data)
  .then((response) => {
    const { success, message } = response.data;
    if (success) {
      setMostrarTelaInicial(true);
      setMostrarLogin(false); // Defina para não exibir o Login após o login bem-sucedido
    } else {
      console.log("erro")
      }
    })
};

// Verificar conexao com a internet










  return (
    <div>
    <div className="grade">
    <div className="body-app">

      <div className={exibirTelaInicial ? 'exibir' : 'ocultar'}>
        <div className="title">
        <h2>Bem vindo(a)<br></br> ao Nublify Smart Device 
          <sup>
            <a data-tooltip-id="dica" data-tooltip-content="Conecte-se à internet e siga os passos abaixo">
              <FontAwesomeIcon icon={faCircleInfo} className='tips'/>  </a>
            </sup>
            
          
          </h2>
          <ReactTooltip id="dica" />
        </div>


      </div>

      {exibirVerificarConexao && <VerificarConexao onConexaoEstabelecida={onConexaoEstabelecida} />}

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
      </div>
      <div className="controls">
      <button onClick={handleTelaInicial} className="btn-voltar">Voltar</button>
      <button onClick={handleConexaoEstabelecida}>Internet?</button>
      <button onClick={handleExibirVerificarConexao} className='btn-conectado'>Verificar Conexão</button>
        <button onClick={handleMostrarRemoteForm} className='configurar'>Remote Form</button>
        {logado ? (
          <button onClick={handleLogout} className='logoff'>Logoff</button>
        ) : (
          <button onClick={handleMostrarLogin} className='login'>Login</button>
        )}
        
      </div>
    
    
    
    </div>
  );
};

export default TelaInicial;
