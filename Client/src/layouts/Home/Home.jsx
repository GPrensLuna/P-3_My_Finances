import { URL } from "../../config";
import { useState, useEffect } from "react";
import * as Components from "../../Components";

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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data?.map(
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
        if (error.message.includes("NetworkError")) {
          console.error(
            "Network error. Please check your internet connection."
          );
        } else {
          console.error("Error requesting GET:", error);
        }
      });
  }, []);

  const handleUpdateTasks = () => {
    fetch(`${URL}tasks`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data?.map(
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
        const formattedData = data?.map(
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

      const formattedData = data?.map(
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
    <div className="grid grid-cols-1 lg:grid-cols-5 w-full">
      <div className="lg:col-span-4">
        <div className="flex justify-center text-[48px]">
          <h1 className="justify-center">INSECT PAYMENTS MADE</h1>
        </div>
        <Components.InsectForm handleUpdate={handleUpdate} />
        <div className="overflow-hidden m-3 rounded-md shadow-md">
          <Components.Dashboard
            shoppingData={shoppingData}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
      <div className="lg:w-full h-screen border-slate-800 border-l-2 p-4 overflow-y-auto text-center">
        <h1 className="text-2xl font-bold border-b-2">PENDING TASKS</h1>
        <Components.Reminder
          tasksData={tasksData}
          handleUpdateTasks={handleUpdateTasks}
        />
      </div>
    </div>
  );
};
