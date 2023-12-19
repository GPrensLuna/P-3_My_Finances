import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { URL } from "../../config";
import { CardsTasks } from "../CardsTasks/CardsTasks.jsx";

export const Reminder = ({ onTableUpdate }) => {
  const [tasksData, setTasksData] = useState([]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);

    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  useEffect(() => {
    fetch(`${URL}tasks`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map(
          ({
            _id,
            concept,
            type,
            description,
            value,
            createdAt,
            updatedAt,
          }) => ({
            _id,
            concept,
            type,
            description,
            value,
            createdAt,
            updatedAt,
            CreatedAt: formatCreatedAt(createdAt),
          })
        );

        setTasksData(formattedData);
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  }, []);

  const handleUpdateTasks = () => {
    fetch(`${URL}tasks`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map(
          ({
            _id,
            concept,
            type,
            description,
            value,
            createdAt,
            updatedAt,
          }) => ({
            _id,
            concept,
            type,
            description,
            value,
            createdAt,
            updatedAt,
            CreatedAt: formatCreatedAt(createdAt),
          })
        );
        setTasksData(formattedData);
        onTableUpdate();
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  };

  return (
    <div className="">
      {tasksData?.map((e) => (
        <CardsTasks
          key={e._id}
          id={e._id}
          name={e.name}
          concept={e.concept}
          type={e.type}
          description={e.description}
          value={e.value}
          done={e.done}
          deleted={e.deleted}
          createdAt={e.CreatedAt}
          onUpdateTasks={handleUpdateTasks}
        />
      ))}
    </div>
  );
};

Reminder.propTypes = {
  onTableUpdate: PropTypes.func,
};
