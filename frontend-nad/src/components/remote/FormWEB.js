import React, { useState } from 'react';

const ipLocal = process.env.REACT_APP_IP_BACK;

const ConfirmationPopup = ({ onConfirm, onCancel }) => (
  <div className="confirmation-popup">
    <p>Tem certeza que deseja prosseguir?</p>
    <button onClick={onConfirm} className="confirmation-btn-y">Sim</button>
    <button onClick={onCancel}className="confirmation-btn-n">Não</button>
  </div>
);

const FormWEB = () => {
  const [formData, setFormData] = useState({
    connectionType: "WEB",
    host: '',
    connected:true,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
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
 window.location.reload(true);
      } else {
        console.error('Erro ao enviar os dados do formulário.');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }

    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    console.log('Operação cancelada pelo usuário.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exibir a div de confirmação
    setShowConfirmation(true);
  };

  return (
    <div>
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

      {showConfirmation && (
        <ConfirmationPopup onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default FormWEB;
