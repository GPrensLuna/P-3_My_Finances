import { useState } from "react";
import PropTypes from "prop-types";

export const DataTable = ({ data, columns }) => {
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleFilterChange = (columnKey, value) => {
    setFilters({
      ...filters,
      [columnKey]: value,
    });
  };

  const handleSort = (columnKey) => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      const key = sortConfig.key;
      const aValue = a[key];
      const bValue = b[key];

      if (sortConfig.direction === "ascending") {
        if (key === "CreatedAt") {
          return new Date(aValue) - new Date(bValue);
        } else if (key === "Value") {
          return (
            parseFloat(aValue.replace(/[^\d.-]/g, "")) -
            parseFloat(bValue.replace(/[^\d.-]/g, ""))
          );
        } else {
          return aValue.localeCompare(bValue);
        }
      } else {
        if (key === "CreatedAt") {
          return new Date(bValue) - new Date(aValue);
        } else if (key === "Value") {
          return (
            parseFloat(bValue.replace(/[^\d.-]/g, "")) -
            parseFloat(aValue.replace(/[^\d.-]/g, ""))
          );
        } else {
          return bValue.localeCompare(aValue);
        }
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (typeof item[key] === "string") {
        return item[key].toLowerCase().includes(filters[key].toLowerCase());
      }
      return item[key] === filters[key];
    });
  });

  return (
    <div className="overflow-x-auto rounded-lg mt-6">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-base mx-auto">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap py-2 font-medium text-gray-900 cursor-pointer"
                onClick={() => handleSort(column.key)}
              >
                <div className="flex flex-col px-8">
                  {column.label}
                  <input
                    className=""
                    type="text"
                    placeholder={`  Filter ${column.label}`}
                    onChange={(e) =>
                      handleFilterChange(column.key, e.target.value)
                    }
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredData.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="whitespace-nowrap py-2 font-medium text-gray-900 text-center align-middle"
                >
                  {item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilterChange: PropTypes.func,
};
