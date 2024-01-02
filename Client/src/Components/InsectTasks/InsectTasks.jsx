/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { URL } from "../../config";
import { Successful } from "../ModalWindows/Successful";

export const InsectTasks = () => {
  const [conceptData, setConceptData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [typeData, setTypeData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    concept: "",
    type: "",
    description: "",
    value: "",
  });

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchData(`${URL}concept`, setConceptData);
  }, []);

  useEffect(() => {
    fetchData(`${URL}type`, setTypeData);
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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
      setModalMessage("Saved successfully!");
      toggleModal();

      // const data = await response.json();
      // console.log("Request server:", data);
    } catch (error) {
      console.error("Fetch Error:", error.message);
      setModalMessage("Error: " + error.message);
      toggleModal();
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
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto"
        style={{ minWidth: "450px" }}
      >
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2 m-3"
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
          className="block text-gray-700 text-sm font-bold mb-2 m-3 "
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
            {Array.isArray(conceptData) ? (
              conceptData.map((opConcept) => (
                <option key={opConcept._id} value={opConcept.name}>
                  {opConcept.name}
                </option>
              ))
            ) : (
              <option value="">Error loading concepts</option>
            )}
          </select>
        </label>

        <label
          htmlFor="type"
          className="block text-gray-700 text-sm font-bold mb-2 m-3"
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
            {Array.isArray(typeData) ? (
              typeData?.map((opPaid) => (
                <option key={opPaid._id} value={opPaid.name}>
                  {opPaid.name}
                </option>
              ))
            ) : (
              <option value=""> Error loading concepts</option>
            )}
          </select>
        </label>

        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2 m-3"
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
          className="block text-gray-700 text-sm font-bold mb-2 m-3"
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

      <Successful
        isOpen={modalOpen}
        message={modalMessage}
        onClose={toggleModal}
      />
    </>
  );
};
