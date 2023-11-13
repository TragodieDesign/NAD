import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess, onLoginError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    const data = {
      username,
      password,
    };

    axios
      .post('http://localhost:3003/auth', data)
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          setLoginError(null);
          onLoginSuccess();
          // Recarrega a página após o login bem-sucedido
        } else {
          setLoginError('Login ou senha incorretos');
          // Verifica se onLoginError é uma função antes de chamá-la
          if (typeof onLoginError === 'function') {
            onLoginError(message);
          }
        }
      })
      .catch((error) => {
        const errorMessage = 'Erro ao autenticar';
        setLoginError(errorMessage);
        // Verifica se onLoginError é uma função antes de chamá-la
        if (typeof onLoginError === 'function') {
          onLoginError(errorMessage);
        }
        console.error(errorMessage, error);
      });
  };

  return (
    <div className='login-box'>
      <div className='login-title'>
        <h1>Digite seu login e senha:</h1>
      </div>
      <form className='login-inputs'>
        <div>
          <input
            className='input'
            type='text'
            name='username'
            value={username}
            onChange={handleInputChange}
            placeholder='Usuário:'
          />
        </div>
        <div>
          <input
            className='input'
            type='password'
            name='password'
            value={password}
            onChange={handleInputChange}
            placeholder='Senha:'
          />
        </div>
      </form>
      {loginError && <div className='error-message'>{loginError}</div>}
      <button onClick={handleLogin} className='btn-grad'>
        Realizar Login
      </button>
    </div>
  );
};

export default Login;
