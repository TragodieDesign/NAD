import React, { useState, useEffect } from 'react';
import ConexaoCabo from './ConexaoCabo';
import ConexaoWifi from './ConexaoWifi';
import Login from '../login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet, faWifi,faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import "./Wifi.styles.css";
import axios from "axios";
//import { useIP } from '../IPContext';

const setIpLocal = window.location.hostname || 'localhost';
const serverPort = 3003;

const ipLocal = (`http://${setIpLocal}:${serverPort}`)


console.log("Valor do IP" , ipLocal)




console.log(`O IP do frontend é ${setIpLocal}`)

const VerificarConexao = ({ onConexaoEstabelecida }) => {

//const { ipLocal } = useIP();


  const [conectado, setConectado] = useState(false);
  const [exibirConexaoCabo, setExibirConexaoCabo] = useState(false);
  const [exibirConexaoWifi, setExibirConexaoWifi] = useState(false);
  const [exibirBotaoConectado, setExibirBotaoConectado] = useState(false);
  const [exibirLogin, setExibirLogin] = useState(false);
  const [exibirVerificarConexao, setExibirVerificarConexao] = useState(true);





  const handleConexaoCabo = () => {
    setExibirConexaoCabo(true);
    setExibirVerificarConexao(false);
  };

  const handleConexaoWifi = () => {
    setExibirConexaoWifi(true);
    setExibirVerificarConexao(false);
  };

  const handleConexaoFinalizada = async () => {
    try {

      const response = await axios.get(`${ipLocal}/network`);
      if (response.status === 200) {
        console.log("com internet")
        setExibirLogin(true);
        setExibirVerificarConexao(false);
        setExibirConexaoCabo(false);
        setExibirConexaoWifi(false);

      }
    } catch (error) {
      console.error('Erro ao verificar conexão:', error);
    }
  };



  useEffect(() => {
    const verificarConexao = async () => {
      try {
        const response = await axios.get(`${ipLocal}/network`);


        if (response.data && (response.data.success || response.data.error)) {


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







  const handleBotaoConectado = () => {
    setExibirLogin(true);
  };

  const handleVoltarVerificarConexao = () => {
    setExibirVerificarConexao(true);
    setExibirConexaoWifi(false);
  };

  return (
    <div className='connect-intro'>
      {exibirVerificarConexao && (
        <div className='connect-intro'>

          <p>Para iniciar, selecione um método de conexão com a internet para iniciar a sua conexão remota:

          <sup>
            <a data-tooltip-id="dica" data-tooltip-content="O acesso à internet é essencial para poder acessar sua máquina remota">
              <FontAwesomeIcon icon={faCircleInfo} className='tips'/>  </a>
            </sup>
            <ReactTooltip id="dica" />
          </p>
          <div className='connect-options'>
            <button className='connect-cable' onClick={handleConexaoCabo}>
              <FontAwesomeIcon icon={faEthernet} />
              <br></br>
              Conectar com cabo
            </button>
            <button className='connect-wifi' onClick={handleConexaoWifi}>
              <FontAwesomeIcon icon={faWifi} />
              <br></br>
              Conectar com Wi-Fi
            </button>
          </div>
        </div>
      )}

      {exibirConexaoCabo && (
        <ConexaoCabo onConexaoEstabelecida={handleConexaoFinalizada} />
      )}

      {exibirConexaoWifi && (
        <ConexaoWifi onConexaoEstabelecida={handleConexaoFinalizada} onVoltarClick={handleVoltarVerificarConexao} />
      )}

      {exibirBotaoConectado && !exibirLogin && (
        <div>
          <button onClick={handleBotaoConectado}>Conectado</button>
        </div>
      )}

      {exibirLogin && (
        <Login onLoginSuccess={() => console.log('Login bem-sucedido')} />
      )}
    </div>
  );
};

export default VerificarConexao;
