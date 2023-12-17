import { useEffect, useState } from "react";
import { DataTable } from "./DataTable/DataTable.jsx";
import { URL } from "../../config";

export const Dashboard = () => {
  const [shoppingData, setShoppingData] = useState([]);

  useEffect(() => {
    fetch(`${URL}shopping`)
      .then((response) => response.json())
      .then((data) => {
        setShoppingData(
          data.map((item) => ({
            ...item,
            formattedCreatedAt: formatCreatedAt(item.createdAt),
          }))
        );
      })
      .catch((error) => {
        console.error("Error request GET:", error);
      });
  }, []);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  const columns = [
    {
      key: "formattedCreatedAt",
      label: "Creation Date",
      accessor: "formattedCreatedAt",
    },
    { key: "conceptName", label: "Concept Name", accessor: "concept.name" },
    { key: "description", label: "Description", accessor: "description" },
    { key: "typeName", label: "Type Name", accessor: "type.name" },
    { key: "value", label: "Value", accessor: "value" },
  ];

  return (
    <div>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <DataTable data={shoppingData} columns={columns} />
        </div>
      </div>
    </div>
  );
};
