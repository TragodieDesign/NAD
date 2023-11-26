import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHouseLaptop, faLaptopCode, faGlobe, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip as ReactTooltip } from 'react-tooltip'



const ipLocal = (process.env.REACT_APP_IP_BACK)

const RemoteForm = () => {
  const [formData, setFormData] = useState({
    connectionType: '',
    host: '',
    remoteUser: '',
    remotePassword: '',
  });

  const [selectedConnection, setSelectedConnection] = useState(null);

  const handleOptionClick = (value) => {
    setFormData({
      ...formData,
      connectionType: value,
    });
    setSelectedConnection(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${ipLocal}/make-json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Dados do formulário enviados com sucesso!');
      } else {
        console.error('Erro ao enviar os dados do formulário.');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='connection-type'>
        <div className='connection-title'>
          <h1>Escolha a sua conexão: 
            <sup>
            <a data-tooltip-id="dica" data-tooltip-content="Utilize os dados de conexão com sua máquina remota">
              <FontAwesomeIcon icon={faCircleInfo} className='tips'/>  </a>
            </sup>
        
            
              
           </h1>


<ReactTooltip id="dica" />
        </div>
        <div className='radio-icons-wrapper'>
          <div
            className={`conection-option ${selectedConnection === 'SSH' ? 'selected-ssh' : ''}`}
            onClick={() => handleOptionClick('SSH')}
          >
            <div className='connect-icon'>
              <FontAwesomeIcon icon={faCode} />
            </div>
            <p>SSH</p>
          </div>
          <div
            className={`conection-option ${selectedConnection === 'VNC' ? 'selected-vnc' : ''}`}
            onClick={() => handleOptionClick('VNC')}
          >
            <div className='connect-icon'>
              <FontAwesomeIcon icon={faHouseLaptop} />
            </div>
            <p>VNC</p>
          </div>
          <div
            className={`conection-option ${selectedConnection === 'RDP' ? 'selected-rdp' : ''}`}
            onClick={() => handleOptionClick('RDP')}
          >
            <div className='connect-icon'>
              <FontAwesomeIcon icon={faLaptopCode} />
            </div>
            <p>RDP</p>
          </div>
          <div
            className={`conection-option ${selectedConnection === 'Web' ? 'selected-web' : ''}`}
            onClick={() => handleOptionClick('Web')}
          >
            <div className='connect-icon'>
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <p>WEB</p>
          </div>
        </div>
      </div>
      <br />
      <div className='inputs-wrapper'>
        <div className='inputbox'>
          <input
          required
            className='input'
            type="url"
            name="host"
            value={formData.host}
            onChange={(e) => setFormData({ ...formData, host: e.target.value })}
            placeholder='Insira o IP ou host:'
          />
          <i></i>
        </div>
        <div className='inputbox'>
          <input
          required
            className='input'
            type="text"
            name="remoteUser"
            value={formData.remoteUser}
            onChange={(e) => setFormData({ ...formData, remoteUser: e.target.value })}
            placeholder='Insira o usuário do acesso remoto:'
          />
          <i></i>
        </div>
        <div className='inputbox'>
          <input
          required
            className='input'
            type="password"
            name="remotePassword"
            value={formData.remotePassword}
            onChange={(e) => setFormData({ ...formData, remotePassword: e.target.value })}
            placeholder='Insira a senha do acesso remoto:'
          />
          <i></i>
        </div>
      </div>
      <div className='button-wrapper'>
        <button type="submit" className='remote-btn'>
          Conectar
        </button>
      </div>
    </form>
  );
};

export default RemoteForm;
