import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode,faHouseLaptop, faLaptopCode } from '@fortawesome/free-solid-svg-icons';


const RemoteForm = () => {
  const [formData, setFormData] = useState({

    connectionType: '',
    host: '',
    remoteUser: '',
    remotePassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3003/make-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
<div className= 'connection-type'>
  <div className='connection-title'>
    <h1>Escolha a sua conexão:</h1>
  </div>
<div className='radio-icons-wrapper'>

<div className='conection-option'>
<div className='connect-icon'>
  <FontAwesomeIcon icon={faCode} />
  </div>
  <p>SSH</p>

  <input type="radio" value="SSH" name="connectionType" onChange={handleChange} /> 
</div>
<div className='conection-option'>
<div className='connect-icon'>
  <FontAwesomeIcon icon={faHouseLaptop} />
  </div>
  <p>VNC</p>
  <input type="radio" value="VNC" name="connectionType" onChange={handleChange} /> 
</div>
<div className='conection-option'>
<div className='connect-icon'>
<FontAwesomeIcon icon={faLaptopCode} />
  </div>
  <p>RDP</p>
  <input type="radio" value="RDP" name="connectionType" onChange={handleChange} /> 
</div>

</div>

</div>
      <br />
      <div className='inputs-wrapper'>
      
      <div className='inputbox'>

          <input
          className='input'
            type="url"
            name="host"
            value={formData.host}
            onChange={handleChange}
            placeholder='Insira o IP ou host:'
          />

          <i></i>
        
      </div>
      <div className='inputbox'>

          <input
          className='input'
            type="text"
            name="remoteUser"
            value={formData.user}
            onChange={handleChange}
            placeholder='Insira o usuário do acesso remoto:'
          />

          <i></i>
        
      </div>

      <div className='inputbox'>
          <input
            className='input'
            type="password"
            name="remotePassword"
            value={formData.password}
            onChange={handleChange}
            placeholder='Insira a senha do acesso remoto:'
          />

    <i></i>
        
      </div>
      
      </div>

      <div className='button-wrapper'>
        <button type="submit" className='btn-grad'>Conectar</button>
      </div>
    </form>
  );
};

export default RemoteForm;
