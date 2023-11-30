import React, { useState } from 'react';

const FormWEB = () => {
  const [formData, setFormData] = useState({
    host: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
          onChange={handleChange}
          placeholder='Insira o IP ou host:'
        />
        <i></i>
      </div>
    </div>
  );
};

export default FormWEB;
