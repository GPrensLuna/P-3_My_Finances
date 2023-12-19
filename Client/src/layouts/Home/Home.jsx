import { useState } from "react";
import * as Components from "../../Components";

export const Home = () => {
  const [updateTable, setUpdateTable] = useState(false);

  const handleTableUpdate = () => {
    setUpdateTable(!updateTable);
  };
  return (
    <div className="flex">
      <div className="flex-1">
        <Components.InsectFrom />
        <div className="overflow-hidden border border-gray-300 rounded-md shadow-md m-6">
          <Components.Dashboard />
        </div>
      </div>
      <div className="max-h-full overflow-y-auto">
        <Components.Reminder onTableUpdate={handleTableUpdate} />
      </div>
    </div>
  );
};
