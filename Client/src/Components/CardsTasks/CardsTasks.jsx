import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { URL } from "../../config.js";
import { Validation } from "../ModalWindows/Validation";

export const CardsTasks = ({
  id,
  name,
  concept,
  type,
  description,
  value,
  done,
  createdAt,
  onUpdateTasks,
}) => {
  const [doneAct, setDoneAct] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }

  useEffect(() => {
    if (done && !doneAct) {
      setIsHidden(true);
      setTimeout(() => {
        setDoneAct(true);
        setIsHidden(false);
      }, 500);
    }
  }, [done, doneAct]);

  if (isHidden) {
    return null;
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleConfirmationModal = () => {
    setConfirmationModalOpen(!confirmationModalOpen);
  };

  const handleConfirmClick = async () => {
    try {
      toggleConfirmationModal(); // Cerrar la ventana modal de confirmación

      setLoading(true);

      const jsonData = {
        concept,
        type,
        description,
        value,
      };

      await fetch(`${URL}shopping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const updatedData = {
        deleted: true,
      };

      const putResponse = await fetch(`${URL}tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!putResponse.ok) {
        throw new Error(`HTTP error! Status: ${putResponse.status}`);
      }

      onUpdateTasks();
      toggleModal();
    } catch (error) {
      setError(error.message);
      toggleModal();
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    try {
      toggleConfirmationModal(); // Cerrar la ventana modal de confirmación

      setLoading(true);

      const updatedData = {
        done: true,
      };

      const putResponse = await fetch(`${URL}tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!putResponse.ok) {
        throw new Error(`HTTP error! Status: ${putResponse.status}`);
      }

      onUpdateTasks();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={`m-2 justify-center ${doneAct ? "hidden" : ""}`}>
        <article
          className={`flex flex-col bg-white w-full h-48 rounded-md py-3 px-6 border ${
            doneAct ? "opacity-0" : ""
          }`}
        >
          <header className="text-center">
            <h1 className="font-bold text-xl text-gray-800 pb-2">
              {currencyFormatter({ currency: "CLP", value })}
            </h1>
            <h2 className="text-base font-semibold text-gray-900">{name}</h2>
          </header>
          <p className="text-sm text-gray-500 pb-3">{description}</p>
          <div className="flex gap-2 text-sm justify-center text-gray-500 border-b pb-2">
            <span className="font-bold">Fecha de creación:</span>
            <time>{createdAt}</time>
          </div>
          <div className="flex justify-center items-center gap-4 mt-auto">
            <div className="flex gap-1 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
              <svg
                className="w-6 stroke-green-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></svg>
              <button
                className="font-semibold text-sm text-green-500 px-5 py-1 rounded border border-green-500 hover:bg-green-700 hover:text-white"
                onClick={toggleConfirmationModal}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Configurar"}
              </button>
            </div>
            <div className="flex gap-1 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
              <svg
                className="w-6 stroke-red-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></svg>
              <button
                className="font-semibold text-sm text-red-700 px-5 py-1 rounded border border-red-700 hover:bg-red-700 hover:text-white"
                onClick={handleDeleteClick}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Eliminar"}
              </button>
            </div>
          </div>
          {error && (
            <div className="text-red-500 font-bold text-sm mt-2">
              Error: {error}
            </div>
          )}
        </article>
      </section>
      <Validation
        isOpen={confirmationModalOpen}
        message="¿Estás seguro de completar esta tarea?"
        onConfirm={handleConfirmClick}
        onCancel={toggleConfirmationModal}
      />
    </>
  );
};

CardsTasks.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  concept: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.number,
  done: PropTypes.bool,
  deleted: PropTypes.bool,
  createdAt: PropTypes.string,
  onUpdateTasks: PropTypes.func,
};
