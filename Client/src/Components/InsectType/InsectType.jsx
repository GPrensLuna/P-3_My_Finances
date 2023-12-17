import { useState } from "react";
import { URL } from '../../config';

export const InsectType = () => {
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');

  const handleValueType = (e) => {
    const inputValue = e.target.value.toLowerCase();

    if (!inputValue.trim()) {
      setError('Field cannot be empty');
    } else if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
      setError('Only letters are allowed in the field');
    } else {
      setError('');
    }

    setSelectedType(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    }

    const formData = {
      type: selectedType,
    };

    try {
      const response = await fetch(`${URL}type`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setSelectedType('');
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="insectType">Insect types
          <input type="text" id="value" value={selectedType} onChange={handleValueType} />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Save</button>
      </form>
    </>
  );
};