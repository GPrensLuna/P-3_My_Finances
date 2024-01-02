import { useState } from "react";
import { URL } from "../../config";
import { Successful } from "../ModalWindows/Successful";

export const InsectType = () => {
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleValueType = (e) => {
    const inputValue = e.target.value.toLowerCase();

    if (!inputValue.trim()) {
      setError("Field cannot be empty");
    } else if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
      setError("Only letters are allowed in the field");
    } else {
      setError("");
    }

    setSelectedType(inputValue);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setSelectedType("");
      setModalMessage("Saved successfully!");
      toggleModal();
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      setModalMessage("Error: " + error.message);
      toggleModal();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="min-w-[120px] max-w-md mx-auto">
        <label
          htmlFor="insectType"
          className="block text-gray-700 justify-center text-sm font-bold mb-2 min-w-[120px]"
        >
          Insect types
          <input
            type="text"
            id="value"
            value={selectedType}
            onChange={handleValueType}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
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
