import { URL } from "../../config";
import { useState, useEffect } from "react";
import * as Components from "../../Components";
import PropTypes from "prop-types";

export const Home = () => {
  const [tasksData, setTasksData] = useState([]);
  const [shoppingData, setShoppingData] = useState([]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);

    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
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
        handleUpdate();
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  };

  useEffect(() => {
    fetch(`${URL}shopping`, {
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
            Value: formatCurrency(value),
            createdAt,
            updatedAt,
            CreatedAt: formatCreatedAt(createdAt),
          })
        );

        setShoppingData(formattedData);
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  }, []);

  const handleUpdate = async () => {
    console.log("handleUpdateDashboard is being executed");
    try {
      const response = await fetch(`${URL}shopping`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const formattedData = data.map(
        ({ _id, concept, type, description, value, createdAt, updatedAt }) => ({
          _id,
          concept,
          type,
          description,
          Value: formatCurrency(value),
          createdAt,
          updatedAt,
          CreatedAt: formatCreatedAt(createdAt),
        })
      );

      setShoppingData(formattedData);
    } catch (error) {
      console.error("Error requesting GET:", error);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <Components.InsectFrom handleUpdateFrom={handleUpdate} />
        <div className="overflow-hidden border border-gray-300 rounded-md shadow-md m-6">
          <Components.Dashboard
            shoppingData={shoppingData}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
      <div className="max-h-full overflow-y-auto">
        <Components.Reminder
          tasksData={tasksData}
          handleUpdateTasks={handleUpdateTasks}
        />
      </div>
    </div>
  );
};

Home.propTypes = {
  shoppingData: PropTypes.func,
  handleUpdate: PropTypes.func,
};
