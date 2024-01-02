import { useState } from "react";
import { DataTable } from "./DataTable/DataTable.jsx";
import PropTypes from "prop-types";

export const Dashboard = ({ shoppingData, handleUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateDashboard = async () => {
    try {
      setLoading(true);
      await handleUpdate();
    } catch (error) {
      console.error("Error updating tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "CreatedAt", label: "Created", accessor: "CreatedAt" },
    { key: "concept", label: "Concept", accessor: "concept" },
    { key: "description", label: "Description", accessor: "description" },
    { key: "type", label: "Type", accessor: "type" },
    { key: "Value", label: "Value", accessor: "Value" },
  ];

  return (
    <>
      <div className="flex justify-center w-full">
        <button
          onClick={handleUpdateDashboard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>

      <DataTable data={shoppingData} columns={columns} />
    </>
  );
};

Dashboard.propTypes = {
  shoppingData: PropTypes.array,
  handleUpdate: PropTypes.func,
};
