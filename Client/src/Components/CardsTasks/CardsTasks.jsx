import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const CardsTasks = ({ name, description, value, done, createdAt }) => {
  const [doneAct, setDoneAct] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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

  const handleConfirmClick = () => {
    setDoneAct(true);
  };

  return (
    <div className={`m-2 ${doneAct ? "hidden" : ""}`}>
      <div
        className={`flex flex-col bg-white w-72 h-48 rounded-md py-3 px-6 border ${
          doneAct ? "opacity-0" : ""
        }`}
      >
        <h3 className="text-center font-bold text-xl text-gray-800 pb-2">
          {value}
        </h3>
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 pb-3">{description}</p>
        <div className="flex gap-2 text-sm text-gray-500 border-b pb-2">
          <p className="">Creation date:</p>
          <p>{createdAt}</p>
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
              onClick={handleConfirmClick}
            >
              Set up
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
            <button className="font-semibold text-sm text-red-700 px-5 py-1 rounded border border-red-700 hover:bg-red-700 hover:text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CardsTasks.propTypes = {
  name: PropTypes.string,
  concept: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.number,
  done: PropTypes.bool,
  deleted: PropTypes.bool,
  createdAt: PropTypes.string,
};
