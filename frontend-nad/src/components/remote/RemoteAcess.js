import React, { useState } from 'react';

const RemoteForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    connectionType: '',
    host: '',
    user: '',
    password: '',
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
      <div>
        <label>
          Selecione o tipo de conexão:
          <div>
            <input type="radio" value="SSH" name="connectionType" onChange={handleChange} /> SSH
          </div>
          <div>
            <input type="radio" value="VNC" name="connectionType" onChange={handleChange} /> VNC
          </div>
          <div>
            <input type="radio" value="RDP" name="connectionType" onChange={handleChange} /> RDP
          </div>
        </label>
      </div>
      <br />

      <div>
        <label>
          Insira o IP ou host:
          <input
            type="url"
            name="host"
            value={formData.host}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Insira o usuário do acesso remoto:
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Insira a senha do acesso remoto:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">Conectar</button>
      </div>
    </form>
  );
};

export default RemoteForm;
