import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Wifi.styles.css";
import WifiSignal from './Wifi-signal';

const ConexaoWifi = ({ onConexaoEstabelecida }) => {
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
        const response = await axios.get('http://localhost:3003/network');
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
      const response = await axios.post('http://localhost:3003/network/disconnect');

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
      const response = await axios.post('http://localhost:3003/network/authenticate', {
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
              <div className='connect-password-group'>
                <div className='input-password-group'>
                  <input
                    className='input-password'
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleConectar} className='connect-wifi-btn'>Conectar</button>
                {mensagem && exibirResponseWifi && <p>{mensagem}</p>}
              </div>
            </div>
          )}
        </div>
      )}
      <div className='wifi-footer'>
        <button onClick={hanldeDisconnect} className='disconnect-btn'>Desconectar</button>
        <button onClick={handleReload} className='reload-btn'>Voltar</button>
      </div>
    </div>
  );
};

export default ConexaoWifi;
