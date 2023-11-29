import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ipLocal = (process.env.REACT_APP_IP_BACK)



const ConexaoCabo = ({ onConexaoEstabelecida }) => {
  const [conectado, setConectado] = useState(false);
  const handleReload = () => {
    window.location.reload();
  };
 
  useEffect(() => {
    const verificarConexao = async () => {
      try {
        const response = await axios.get(`${ipLocal}/network`);
        console.log(response);
  
        if (response.data && (response.data.success || response.data.error)) {
          console.log(response.data.success || response.data.error);
  
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
  

  return (
    <div className="Instrucoes">
      <div className='passo-a-passo'>
        <h3>Passo 1:</h3>
        <p>Conecte um cabo de rede ao seu roteador</p>
        <div className='img-wrapper'>
        <img src='./modem.png'></img>
        <p>   <FontAwesomeIcon icon={faArrowRight} className='arrow'/>  </p>
        <img src='./cabo.png'></img>
        </div>
        <h3>Passo 2:</h3>
        <p>Conecte a outra extremidade na entrada correspondente à entrada do dispositivo</p>
        <div className='img-wrapper'>
        <img src='./entrada.png'></img>
        <p>  <FontAwesomeIcon icon={faArrowRight} className='arrow'/> </p>
        <img src='./smart.png'></img>
        </div>

      </div>
      <div className='aguardando'>
      {conectado ? null : 
      <div className="aguardando">
        <div className='gif'><img src='./Spinner-1.1s-88px.svg'></img> </div>
        <p>Aguardando conexão...</p>
       </div>}
      </div>
  <div className='voltar'>
  <button onClick={handleReload} className='reload-btn'>Voltar</button>
  </div>
  </div>
  )
};


export default ConexaoCabo;
