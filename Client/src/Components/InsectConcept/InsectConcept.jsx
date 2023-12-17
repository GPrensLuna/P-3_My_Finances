import { useState } from "react";
import { URL } from '../../config';

export const InsectConcept = () => {
  const [selectedConcept, setSelectedConcept] = useState('');
  const [error, setError] = useState('');

  const handleValueConcept = (e) => {
    const inputValue = e.target.value.toLowerCase();

    if (!inputValue.trim()) {
      setError('Field cannot be empty');
    } else if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
      setError('Only letters are allowed in the field');
    } else {
      setError('');
    }

    setSelectedConcept(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    }

    const formData = {
      concept: selectedConcept,
    };

    try {
      const response = await fetch(`${URL}concept`, {
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
      setSelectedConcept('');
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="insectType">Insect concept
          <input type="text" id="value" value={selectedConcept} onChange={handleValueConcept} />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Save</button>
      </form>
    </>
  );
};