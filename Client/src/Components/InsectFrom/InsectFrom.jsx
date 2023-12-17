import { useState, useEffect } from "react";
import { URL } from "../../config";

export const InsectFrom = () => {
  const [conceptData, setConceptData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [concept, setConcept] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPaid, setSelectedPaid] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch(`${URL}concept`)
      .then((response) => response.json())
      .then((data) => {
        setConceptData(data);
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${URL}type`)
      .then((response) => response.json())
      .then((data) => {
        setTypeData(data);
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  }, []);

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
    const numericValue = parseFloat(rawValue.replace(/[^\d.]/g, ""));

    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      setValue(formattedValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      concept,
      description,
      Type: selectedPaid,
      value: parseFloat(value.replace(/[^\d.]/g, "")),
    };

    // Send the data to your server using fetch or any other method
    fetch(`${URL}shopping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="concept">
          Concept:
          <select id="concept" value={concept} onChange={handleConceptChange}>
            <option value="">...</option>
            {conceptData.map((opConcept) => (
              <option key={opConcept._id} value={opConcept._id}>
                {opConcept.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="description">
          Description:{" "}
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>

        <label htmlFor="paid">
          Paid with:
          <select id="paid" value={selectedPaid} onChange={handleOptionChange}>
            <option value="">...</option>
            {typeData.map((opPaid) => (
              <option key={opPaid._id} value={opPaid._id}>
                {opPaid.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="value">
          Value:{" "}
          <input
            type="text"
            id="value"
            value={value}
            onChange={handleValueChange}
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </>
  );
};
