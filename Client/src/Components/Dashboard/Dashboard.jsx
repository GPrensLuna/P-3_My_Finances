import { useEffect, useState } from "react";
import { DataTable } from "./DataTable/DataTable.jsx";
import { URL } from "../../config";

export const Dashboard = () => {
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

  const handleUpdateDashboard = () => {
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
  };

  const columns = [
    { key: "CreatedAt", label: "Created", accessor: "CreatedAt" },
    { key: "concept", label: "Concept", accessor: "concept" },
    { key: "description", label: "Description", accessor: "description" },
    { key: "type", label: "Type", accessor: "type" },
    { key: "Value", label: "Value", accessor: "Value" },
  ];

  return (
    <DataTable
      data={shoppingData}
      columns={columns}
      handleUpdateDashboard={handleUpdateDashboard}
    />
  );
};
