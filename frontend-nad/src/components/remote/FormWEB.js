import React, { useState } from 'react';



const ipLocal = process.env.REACT_APP_IP_BACK;



const FormWEB = () => {
  
  const [formData, setFormData] = useState({
    connectionType: "WEB",
    host: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
    <form onSubmit={handleSubmit}>
    <div>
      <div className='inputbox'>
        <input
          required
          className='input'
          type="url"
          name="host"
          value={formData.host}
          onChange={handleChange}
          placeholder='Insira o IP ou host:'
        />
        <i></i>
      </div>
      <div className='button-wrapper'>
        <button type="submit" className='remote-btn'>
          Conectar
        </button>
      </div>
    </div>
    </form>
  );
};

export default FormWEB;
