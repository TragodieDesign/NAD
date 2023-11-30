import React, { useState } from 'react';

const FormRDP = () => {
  const [formData, setFormData] = useState({
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

  return (
    <div>
      <div className='inputbox'>
        <input
          required
          className='input'
          type="url"
          name="host"
          value={formData.host}
          onChange={(e) => handleChange(e)}
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
          onChange={handleChange}
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
  );
};

export default FormRDP;
