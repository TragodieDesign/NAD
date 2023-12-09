import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Wifi.styles.css";
import WifiSignal from './Wifi-signal';
//import { useIP } from '../IPContext';



const ConexaoWifi = ({ onConexaoEstabelecida }) => {

  const setIpLocal = window.location.hostname || 'localhost';
  const serverPort = 3003;

  const ipLocal = (`http://${setIpLocal}:${serverPort}`)
 

  console.log("Valor do IP" , ipLocal)

  
  
  
  console.log(`O IP do frontend é ${setIpLocal}`)
  

  const [wifiList, setWifiList] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [password, setPassword] = useState('');
  const [conectado, setConectado] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [exibirResponseWifi, setExibirResponseWifi] = useState(false);
  const [mostrarConexaoWifi, setMostrarConexaoWifi] = useState(true);

  useEffect(() => {
    const carregarRedesWifi = async () => {
      try {
        const response = await axios.get(`${ipLocal}/network`);
        console.log(` enviando requisição de ${ipLocal}`)
        console.log(response)
        const { wifiList } = response.data;

        setWifiList(wifiList);
      } catch (error) {
        console.error('Erro ao carregar redes Wi-Fi:', error);
      }
    };

    carregarRedesWifi();
  }, []);


  const getStatusIcon = (quality) => {
    if (quality >= 70) {
      return "good-connection";
    } else if (quality >= 40) {
      return "fair-connection";
    } else if (quality > 0) {
      return "poor-connection";
    } else {
      return "error";
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  const hanldeDisconnect = async () => {
    try {
      const response = await axios.post(`${ipLocal}/network/disconnect`);

      if (response.status === 200) {
        setConectado(false);
        setMensagem('Você foi desconectado');
      } else {
        setMensagem('Erro ao se desconectar');
      }
    } catch (error) {
      setMensagem(`Erro ao se desconectar: ${error.message}`);
    }
  };

  const handleConectar = async () => {
    try {
      const response = await axios.post(`${ipLocal}/network/authenticate`, {
        ssid: selectedNetwork.ssid,
        password: password,
      });

      if (response.status === 200) {
        setConectado(true);
        onConexaoEstabelecida();
        setMensagem(`Você está conectado à rede Wi-Fi: ${selectedNetwork.ssid}`);
        setExibirResponseWifi(true);

        // Exibir a mensagem por 3 segundos
        setTimeout(() => {
          setExibirResponseWifi(false);
        }, 3000);
      } else {
        setMensagem(`Erro ao conectar à rede Wi-Fi: ${response.data.error}`);
      }
    } catch (error) {
      setMensagem(`Erro ao conectar à rede Wi-Fi: ${error.message}`);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div className='connect-wifi-wrapper'>
      {conectado ? (
        exibirResponseWifi && (
          <div className='response-wifi'>
            <p>{mensagem}</p>
          </div>
        )
      ) : (
        <div className='connect-wifi-wrapper'>
          <div className='response-wifi'>
            <h2>Conexão Wi-fi</h2>

            <p>Escolha uma rede abaixo, clique em "conectar" e digite a senha da sua rede wi-fi</p>
            <h3>Redes Wi-Fi disponíveis:</h3>
            {wifiList && wifiList.length > 0 ? (
              <ul className='wifi-list'>
                {wifiList.map((network, index) => (
                  <li className='wifi-card' key={index}>
                    <div className='wifi-icon-wrapper'>
                      <WifiSignal className='wifi-icon' status={getStatusIcon(network.quality)} />
                    </div>
                    <div className='ssid-wrapper'>{network.ssid}{' '}</div>
                    <button className='select-wifi-btn' onClick={() => setSelectedNetwork(network)}>Conectar</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma rede Wi-Fi disponível.</p>

            )}
          </div>
          {selectedNetwork && (
            <div>
              <div><p>Conectar à rede Wi-Fi: {selectedNetwork.ssid}</p></div>
                <p>{mensagem}</p>
              <div className='connect-password-group'>
                <div className='input-password-group'>
                  <input className='input-password'
                  type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </div>
                  <div>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={handleTogglePassword}
        />{' '}
        Exibir Senha
                  </div>

                <button onClick={handleConectar} className='connect-wifi-btn'>Conectar</button>
                {mensagem && exibirResponseWifi && <p>{mensagem}</p>}
              </div>
                  {conectado ? null :
      <div className="aguardando">
        <div className='gif'><img src='./Spinner-1.1s-88px.svg'></img> </div>
        <p>Aguardando conexão...</p>
       </div>}

            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ConexaoWifi;
