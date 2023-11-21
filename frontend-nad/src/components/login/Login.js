import React, { useState } from 'react';
import axios from 'axios';
import RemoteForm from '../remote/RemoteForm'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Login = ({ onLoginSuccess, onLoginError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [exibirRemoteForm, setExibirRemoteForm] = useState(false);
  const [exibirLogin, setExibirLogin] = useState(true); // Adicione o estado exibirLogin

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
          setExibirRemoteForm(true);
          setExibirLogin(false); // Defina para não exibir o Login após o login bem-sucedido
        } else {
          setLoginError('Login ou senha incorretos');
          if (typeof onLoginError === 'function') {
            onLoginError(message);
          }
        }
      })
      .catch((error) => {
        const errorMessage = 'Erro ao autenticar';
        setLoginError(errorMessage);
        if (typeof onLoginError === 'function') {
          onLoginError(errorMessage);
        }
        console.error(errorMessage, error);
      });
  };

  return (
    <div >
      {exibirLogin && (
        <div className='login-box'>
          <div className='login-title'>
          <div>
          <h1>Digite seu <br></br>login e senha:<sup>
<a data-tooltip-id="dica" 
data-tooltip-content="Insira as credencias do Nublify Smart Device recebidas com o dispositivo">
  <FontAwesomeIcon icon={faCircleInfo} className='tips'/>  </a>
</sup>

</h1>

            </div>
            
          
          
          <ReactTooltip id="dica" />
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
      )}

      {exibirRemoteForm && <RemoteForm />} {/* Exibe o RemoteForm quando exibirRemoteForm for verdadeiro */}
    </div>
  );
};

export default Login;
