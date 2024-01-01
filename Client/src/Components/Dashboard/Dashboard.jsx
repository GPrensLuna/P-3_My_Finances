import { DataTable } from "./DataTable/DataTable.jsx";
import PropTypes from "prop-types";

export const Dashboard = ({ shoppingData, handleUpdate }) => {
  const handleUpdateDashboard = async () => {
    try {
      await handleUpdate();
    } catch (error) {
      console.error("Error updating tasks:", error);
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
      <button onClick={handleUpdateDashboard}>Update</button>
      <DataTable data={shoppingData} columns={columns} />
    </>
  );
};

Dashboard.propTypes = {
  shoppingData: PropTypes.array,
  handleUpdate: PropTypes.func,
};
