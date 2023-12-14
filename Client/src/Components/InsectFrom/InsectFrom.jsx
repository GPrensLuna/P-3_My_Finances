import { useState } from 'react';

export const InsectFrom = () => {

  const opConcept = ["pago", "prestamo", "abono", "tranferencia", "retiro"];
  const opPaid = ["banco", "tarjeta bancolombia", "tarjeta tuya", "a mano", "efectivo"];

  const [concept, setConcept] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPaid, setSelectedPaid] = useState('');
  const [value, setValue] = useState('');

  const handleConceptChange = (e) => {
    setConcept(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedPaid(e.target.value);
  };

  const handleValueChange = (e) => {
    const rawValue = e.target.value;

    const numericValue = parseFloat(rawValue.replace(/[^\d.]/g, ''));

    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      setValue(formattedValue);
    }
  };

  return (
    <>
      <form onSubmit={"handleSubmit"}>
        <label htmlFor="concept">Concept:
          <select id="paid" value={concept} onChange={handleConceptChange}>
            <option value="">...</option>
            {opConcept.map((opConcept, index) => (
              <option key={index} value={opConcept}>{opConcept}</option>
            ))}
          </select>
        </label>

        <label htmlFor="description">Description: <input type="text" id="description" value={description} onChange={handleDescriptionChange} /></label>

        <label htmlFor="paid">Paid with:
          <select id="paid" value={selectedPaid} onChange={handleOptionChange}>
            <option value="">...</option>
            {opPaid.map((opPaid, index) => (
              <option key={index} value={opPaid}>{opPaid}</option>
            ))}
          </select>
        </label>

        <label htmlFor="value">Value: <input type="text" id="value" value={value} onChange={handleValueChange} /></label>

        <button type="submit">Save</button>
      </form>
    </>
  )
}