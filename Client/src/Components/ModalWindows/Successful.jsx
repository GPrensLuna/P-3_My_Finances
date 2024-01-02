import PropTypes from "prop-types";

export const Successful = ({ isOpen, message, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-md">
          <p>{message}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

Successful.propTypes = {
  isOpen: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.string,
};
