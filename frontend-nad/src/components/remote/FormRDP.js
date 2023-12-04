import React, { useState } from 'react';


const ipLocal = process.env.REACT_APP_IP_BACK;

const FormRDP = () => {
  const [formData, setFormData] = useState({
    connectionType: "RDP",
    host: '',
    remoteUser: '',
    remotePassword: '',
    useGateway: false,
    hostGateway: '',
    loginGateway: '',
    passwordGateway: '',
  });

  const handleChange = (e) => {
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




  return (
    <div>
      <form onSubmit={handleSubmit} >
      <div className="form-rdp">
      <div className='inputbox'>
        <input
          required
          className='input'
          type="text"
          name="host"
          value={formData.host}
          onChange={(e) => handleChange(e)}
          placeholder='Insira o IP ou host:'
        />
        <i></i>
      </div>

      <div className='inputbox'>
        <input
          
          className='input'
          type="text"
          name="remoteUser"
          value={formData.remoteUser}
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
          value={formData.remotePassword}
          onChange={handleChange}
          placeholder='Insira a senha do acesso remoto:'
        />
        <i></i>
      </div>

      <label>
        <input
          type="checkbox"
          name="useGateway"
          checked={formData.useGateway}
          onChange={handleChange}
        />
        Utilizar Gateway
      </label>

      {formData.useGateway && (
        <div>
          <div className='inputbox'>
            <input
              required
              className='input'
              type="text"
              name="hostGateway"
              value={formData.hostGateway}
              onChange={handleChange}
              placeholder='Insira o host do Gateway:'
            />
            <i></i>
          </div>

          <div className='inputbox'>
            <input
              required
              className='input'
              type="text"
              name="loginGateway"
              value={formData.loginGateway}
              onChange={handleChange}
              placeholder='Insira o login do Gateway:'
            />
            <i></i>
          </div>

          <div className='inputbox'>
            <input
              required
              className='input'
              type="password"
              name="passwordGateway"
              value={formData.passwordGateway}
              onChange={handleChange}
              placeholder='Insira a senha do Gateway:'
            />
            <i></i>
          </div>
        </div>
      )}
            </div>
            <div className='button-wrapper'>
        <button type="submit" className='remote-btn'>
          Conectar
        </button>
      </div>

      </form>
    </div>
  );
};

export default FormRDP;
