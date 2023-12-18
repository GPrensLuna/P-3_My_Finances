import { useState } from "react";
import PropTypes from "prop-types";

export const DataTable = ({ data, columns, onFilterChange }) => {
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
    onFilterChange && onFilterChange(filters);
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
    <div className="mx-auto my-auto">
      <table
        className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm center-table"
        style={{ margin: "0 auto" }}
      >
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer"
                onClick={() => handleSort(column.key)}
              >
                {column.label}
                <input
                  className="ml-5"
                  type="text"
                  placeholder={`  Filter ${column.label}`}
                  onChange={(e) =>
                    handleFilterChange(column.key, e.target.value)
                  }
                />
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
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center align-middle"
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
