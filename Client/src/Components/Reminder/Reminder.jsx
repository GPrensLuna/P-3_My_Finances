// ChecklistComponent.js
import { useState } from "react";
//import styles from "./ChecklistComponent.module.css";

export const Reminder = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const itemId = event.target.id;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== itemId));
    }
  };

  return (
    <div className="bg-white w-100 h-180 rounded-10 shadow-lg p-6 grid grid-cols-2 items-center justify-center">
      <input
        className="appearance-none relative h-15 w-15 outline-none border-0 m-0 cursor-pointer bg-white grid items-center mr-4"
        checked={checkedItems.includes("01")}
        value="1"
        name="r"
        type="checkbox"
        id="01"
        onChange={handleCheckboxChange}
      />
      <label
        className="cursor-pointer grid items-center w-fit-content transition-colors duration-300 ease-in mr-20"
        htmlFor="01"
      >
        Bread
      </label>
    </div>
  );
};
