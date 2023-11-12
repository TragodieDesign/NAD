// ConexaoWifi.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConexaoWifi = ({ onConexaoEstabelecida }) => {
  const [wifiList, setWifiList] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [password, setPassword] = useState('');
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    const carregarRedesWifi = async () => {
      try {
        const response = await axios.get('http://localhost:3003/network');
        const { wifiList } = response.data;

        setWifiList(wifiList);
      } catch (error) {
        console.error('Erro ao carregar redes Wi-Fi:', error);
      }
    };

    carregarRedesWifi();
  }, []); // Executa apenas uma vez ao montar o componente

  const handleConectar = async () => {
    try {
      const response = await axios.post('http://localhost:3003/network', {
        ssid: selectedNetwork.ssid,
        password: password,
      });

      if (response.status === 200) {
        setConectado(true);
        onConexaoEstabelecida();
      } else {
        console.error('Erro ao conectar à rede Wi-Fi:', response.data.error);
      }
    } catch (error) {
      console.error('Erro ao conectar à rede Wi-Fi:', error);
    }
  };

  return (
    <div>
      {conectado ? (
        <p>Você está conectado à rede Wi-Fi: {selectedNetwork.ssid}</p>
      ) : (
        <div>
          <p>Redes Wi-Fi disponíveis:</p>
          <ul>
            {wifiList.map((network, index) => (
              <li key={index}>
                {network.ssid}{' '}
                <button onClick={() => setSelectedNetwork(network)}>Conectar</button>
              </li>
            ))}
          </ul>
          {selectedNetwork && (
            <div>
              <p>Conectar à rede Wi-Fi: {selectedNetwork.ssid}</p>
              <input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleConectar}>Conectar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConexaoWifi;
