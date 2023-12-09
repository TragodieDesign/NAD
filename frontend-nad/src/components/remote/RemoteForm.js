import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHouseLaptop, faLaptopCode, faGlobe, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import FormSSH from './FormSSH';
import FormVNC from './FormVNC';
import FormRDP from './FormRDP';
import FormWEB from './FormWEB';

const setIpLocal = window.location.hostname || 'localhost';
const serverPort = 3003;

const ipLocal = (`http://${setIpLocal}:${serverPort}`)


console.log("Valor do IP" , ipLocal)




console.log(`O IP do frontend é ${setIpLocal}`)

const RemoteForm = () => {
  const [formData, setFormData] = useState({
    connectionType: '',
    host: '',
    remoteUser: '',
    remotePassword: '',
    useGateway: false,
    hostGateway: '',
    loginGateway: '',
    passwordGateway: '',
  });

  const [selectedConnection, setSelectedConnection] = useState(null);

  const handleOptionClick = (value) => {
    setFormData({
      ...formData,
      connectionType: value,
    });
    setSelectedConnection(value);
    console.log(value);
  };

  const handleChange = (e) => {
    e.persist();
    const { name, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
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
            className={`conection-option ${selectedConnection === 'RDP' ? 'selected-rdp' : ''}`}
            onClick={() => handleOptionClick('RDP')}
          >
            <div className='connect-icon'>
              <FontAwesomeIcon icon={faLaptopCode} />
            </div>
            <p>RDP</p>
          </div>
          <div
            className={`conection-option ${selectedConnection === 'WEB' ? 'selected-web' : ''}`}
            onClick={() => handleOptionClick('WEB')}
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



      {selectedConnection === 'RDP' && <FormRDP handleChange={handleChange} formData={formData} />}
      {selectedConnection === 'WEB' && <FormWEB handleChange={handleChange} formData={formData} />}

      </div>

    </div>
  );
};

export default RemoteForm;




/*
Opções removidas



      {selectedConnection === 'SSH' && <FormSSH />}
      {selectedConnection === 'VNC' && <FormVNC />}

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



          */