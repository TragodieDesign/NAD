import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.messageElement = React.createRef(); // Ref para acessar o elemento do DOM
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleLogin = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    const messageElement = this.messageElement.current;

    messageElement.textContent = '';

    axios
      .post('http://localhost:3003/auth', data)
      .then(response => {
        const message = response.data.success
          ? 'Autenticação bem-sucedida: ' + response.data.message
          : 'Erro na autenticação: ' + response.data.message;

        messageElement.textContent = message;

        if (response.data.success) {
          // Chama a função de sucesso passada como prop
          this.props.onLoginSuccess();
        }
      })
      .catch(error => {
        const errorMessage = 'Erro ao enviar a solicitação de login:' + error.message;
        messageElement.textContent = errorMessage;
        console.error(errorMessage);
      });
  };

  render() {
    return (
      <div>
        <form>
          <div>
            <label>Usuário:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
        </form>
        <div ref={this.messageElement}></div>
        <button onClick={this.handleLogin}>Realizar Login</button>
      </div>
    );
  }
}

export default Login;
