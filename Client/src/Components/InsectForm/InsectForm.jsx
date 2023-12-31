import { useState, useEffect } from "react";
import { URL } from "../../config";
import PropTypes from "prop-types";
import { Successful } from "../ModalWindows/Successful";

export const InsectForm = ({ handleUpdate }) => {
  const [concept, setConcept] = useState("");
  const [typeData, setTypeData] = useState([]);
  const [conceptData, setConceptData] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedPaid, setSelectedPaid] = useState("");
  const [value, setValue] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

    setValue(rawValue);
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      concept,
      description,
      type: selectedPaid,
      value,
    };

    try {
      const response = await fetch(`${URL}shopping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setConcept("");
      setDescription("");
      setSelectedPaid("");
      setValue("");
      handleUpdate();
      setModalMessage("Saved successfully!");
      toggleModal();
    } catch (error) {
      console.error("Fetch Error:", error);
      setModalMessage("Error: " + error.message);
      toggleModal();
    }
  };

  return (
    <>
      <form
        className="mx-auto p-6 bg-white shadow-md rounded-md my-4 grid m-20 border border-solid border-gray-500"
        onSubmit={handleSubmit}
        style={{ minWidth: "500px", maxWidth: "1250px" }}
      >
        <div className="col-span-5 md:grid md:grid-cols-5 md:gap-4">
          <div className="mb-4 md:mb-0 md:col-span-5 lg:col-span-1 lg:w-300 xl:w-400">
            <label
              htmlFor="concept"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Concept:
            </label>
            <select
              id="concept"
              value={concept}
              onChange={handleConceptChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">...</option>
              {Array.isArray(conceptData) ? (
                conceptData?.map((opConcept) => (
                  <option key={opConcept._id} value={opConcept.name}>
                    {opConcept.name}
                  </option>
                ))
              ) : (
                <option value=""> Error loading concepts</option>
              )}
            </select>
          </div>

          <div className="mb-4 md:mb-0 md:col-span-5 lg:col-span-1 lg:w-300 xl:w-400">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4 md:mb-0 md:col-span-5 lg:col-span-1 lg:w-300 xl:w-400">
            <label
              htmlFor="paid"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Paid with:
            </label>
            <select
              id="paid"
              value={selectedPaid}
              onChange={handleOptionChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">...</option>
              {Array.isArray(typeData) ? (
                typeData.map((opPaid) => (
                  <option key={opPaid._id} value={opPaid.name}>
                    {opPaid.name}
                  </option>
                ))
              ) : (
                <option value=""> Error loading concepts</option>
              )}
            </select>
          </div>

          <div className="mb-4 md:mb-0 md:col-span-5 lg:col-span-1 lg:w-300 xl:w-400">
            <label
              htmlFor="value"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Value:
            </label>
            <input
              type="text"
              id="value"
              value={value}
              onChange={handleValueChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="md:col-span-5 lg:col-span-1 lg:w-300 xl:w-400 flex items-center justify-center">
            <button
              type="submit"
              className="w-full md:w-250 max-w-300 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <Successful
        isOpen={modalOpen}
        message={modalMessage}
        onClose={toggleModal}
      />
    </>
  );
};

InsectForm.propTypes = {
  handleUpdate: PropTypes.func,
};
