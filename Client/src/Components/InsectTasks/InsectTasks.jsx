/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { URL } from "../../config";

export const InsectTasks = () => {
  const [conceptData, setConceptData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    concept: "",
    type: "",
    description: "",
    value: "",
  });

  useEffect(() => {
    fetch(`${URL}concept`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setConceptData(data);
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${URL}type`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTypeData(data);
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // const data = await response.json();
      // console.log("Request server:", data);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
    setFormData({
      name: "",
      concept: "",
      type: "",
      description: "",
      value: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Task Name
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <label
          htmlFor="concept"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Concept
          <select
            id="concept"
            name="concept"
            value={formData.concept}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">...</option>
            {conceptData.map((opConcept) => (
              <option key={opConcept._id} value={opConcept.name}>
                {opConcept.name}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="type"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Type
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">...</option>
            {typeData.map((opPaid) => (
              <option key={opPaid._id} value={opPaid.name}>
                {opPaid.name}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <label
          htmlFor="value"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Value
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Save
        </button>
      </form>
    </>
  );
};
