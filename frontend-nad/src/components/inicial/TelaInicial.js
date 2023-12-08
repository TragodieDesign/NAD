import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VerificarConexao from '../conexao/VerificarConexao';
import Login from '../login/Login';
import RemoteForm from '../remote/RemoteForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEthernet,
  faWifi,
  faCircleInfo,
  faPlugCircleXmark,
  faArrowLeft,
  faUserSlash,
  faUser,
  faGear
} from '@fortawesome/free-solid-svg-icons';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const ipLocal = process.env.REACT_APP_IP_BACK;



const TelaInicial = () => {
  const [onConexaoEstabelecida, setConectado] = useState(false);
  const [exibirVerificarConexao, setExibirVerificarConexao] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRemoteForm, setMostrarRemoteForm] = useState(false);
  const [mostrarTelaInicial, setExibirTelaInicial] = useState(true);
  const [username, setUsername] = useState('');
  const [logado, setLogado] = useState(false);
  const [showConfirmation, setShowConfirmation]=useState(false);

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
  }, []);

  useEffect(() => {
    console.log(`Dados: ${username} ${logado}`);
  }, [username, logado]);

  const handleTelaInicial = () => {
    setExibirTelaInicial(true);
    setMostrarLogin(false);
    setMostrarRemoteForm(false);
    setExibirVerificarConexao(false);
  };

  const handleExibirVerificarConexao = () => {
    setExibirVerificarConexao(true);
    setMostrarLogin(false);
    setMostrarRemoteForm(false);
    setExibirTelaInicial(false);
  };

  const handleMostrarLogin = () => {
    setExibirVerificarConexao(false);
    setMostrarLogin(true);
    setMostrarRemoteForm(false);
    setExibirTelaInicial(false);
  };

  const handleMostrarRemoteForm = () => {
    setExibirVerificarConexao(false);
    setMostrarLogin(false);
    setMostrarRemoteForm(true);
    setExibirTelaInicial(false);
  };

  const handleLogout = () => {
    // Exibir a div de confirmação
    setShowConfirmation(true);
  };
const ConfirmationPopup = ({ onConfirm, onCancel }) => (
  <div>
    <div className="confirmation-popup">
    <p>Tem certeza que deseja sair?</p>
    <button onClick={onConfirm} className="confirmation-btn-y">Sim</button>
    <button onClick={onCancel} className="confirmation-btn-n">Não</button>
  </div>
  </div>
);

  const onLogout = () => {
    const data = {
      action: 'logoff',
    };

    axios.post(`${ipLocal}/auth/logoff`, data).then((response) => {
      const { success, message } = response.data;
      if (success) {
        setExibirTelaInicial(true);
        setMostrarLogin(false);
      } else {
        console.log('Erro ao efetuar logoff');
      }
    });
  };
// Verificar conexao com a internet

useEffect(() => {
  const verificarConexao = async () => {
    try {
      const response = await axios.get(`${ipLocal}/network`);
      //console.log(response);

      if (response.data && (response.data.success || response.data.error)) {
        //console.log(response.data.success || response.data.error);

        // Aqui você pode usar a propriedade que indica sucesso ou erro
        if (response.data.success) {
          setConectado(true);
          onConexaoEstabelecida();
        } else {
          // Continua verificando a cada 2 segundos se a conexão foi estabelecida
          setTimeout(verificarConexao, 2000);
        }
      } else {
        // Resposta inesperada, continua verificando
        setTimeout(verificarConexao, 2000);
      }
    } catch (error) {
      // Continua verificando a cada 2 segundos se a conexão foi estabelecida
      setTimeout(verificarConexao, 2000);
    }
  };

  verificarConexao();
}, [onConexaoEstabelecida]);


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ipLocal}make-json/get-json`, {
          method: 'GET',
          credentials: 'include', // para incluir os cookies na requisição
        });

        if (response.ok) {
          const data = await response.json();

        } else if (response.status === 401) {

        } else {

        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);

      } finally {
        console.log("sem json definido")
      }
    };

    fetchData();
  }, []);

  const [supVisible, setSupVisible] = useState(false);

const toggleSupVisibility = () => {
  setSupVisible(!supVisible);
};





 return (
  <div className='main'>


    <div className='wrap-division'>

      <div className='division'>

      </div>

      <div className='division'>
      <div className='header'>
        <img src='logo-nb.png'></img>
        <h2>Bem vindo(a)<br></br> ao Nublify Smart Device </h2>
      </div>
    <div className="grade">
    <div className="body-app">

    <div className={mostrarTelaInicial ? 'exibir' : 'ocultar'}>

        {onConexaoEstabelecida?(
          logado?(
            <RemoteForm/>
          ):(
            <Login />
          )
        ):(
          <VerificarConexao/>
        )
      }

      </div>




      {exibirVerificarConexao && <VerificarConexao onConexaoEstabelecida={onConexaoEstabelecida} />}

      {mostrarLogin && (
        <Login
          logado={() => {
            setExibirTelaInicial(false);
            setMostrarLogin(false);
            setMostrarRemoteForm(true);
            setLogado(true);
          }}
        />
      )}

      {mostrarRemoteForm && <RemoteForm />}
      </div>
      </div>
      </div>
<div className='division-control'>
<div className="controls">
      <button onClick={handleTelaInicial} className="btn-voltar"><FontAwesomeIcon icon={faArrowLeft}/></button>
      {onConexaoEstabelecida ? (
      <button onClick={handleExibirVerificarConexao} className='btn-conectado btn-control'><FontAwesomeIcon icon={faWifi} /></button>
      ):
      (<button onClick={handleExibirVerificarConexao} className='btn-desconectado btn-control'><FontAwesomeIcon icon={faPlugCircleXmark} /></button>)

    }


        <button onClick={handleMostrarRemoteForm} className='configurar btn-control'><FontAwesomeIcon icon={faGear}/></button>
        {logado ? (
          <button onClick={handleLogout} className='logoff btn-control' ><FontAwesomeIcon icon={faUserSlash}/></button>
        ) : (
          <button onClick={handleMostrarLogin} className='login btn-control'><FontAwesomeIcon icon={faUser}/></button>
        )}

<a data-tooltip-id="dica" data-tooltip-content="MAC ADDRESS: Versão:">
<button className='configurar btn-control'>
            <FontAwesomeIcon icon={faCircleInfo} className='macadress' />
            </button>
          </a>



      </div>
</div>
{showConfirmation && (
        <ConfirmationPopup
          onConfirm={() => {
            onLogout();
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}


    </div>
    </div>
  );
};

export default TelaInicial;
