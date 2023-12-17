import PropTypes from "prop-types";

export const DataTable = ({ data, columns }) => {
  const formatDate = (shoppingData) => {
    const date = new Date(shoppingData);
    const day = date.getDate();
    shoppingData;
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td
                key={column.key}
                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center align-middle"
              >
                {column.formatter && typeof column.formatter === "function"
                  ? column.formatter(item[column.accessor])
                  : item[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      formatter: PropTypes.func,
    })
  ).isRequired,
};
