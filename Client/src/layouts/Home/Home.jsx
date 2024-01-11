import { URL } from "../../config";
import * as Components from "../../Components";
import * as Data from "../../Data";
import { PropTypes } from "prop-types";

export const Home = () => {
  const formatTaskData = (data) => ({
    ...data,
    CreatedAt: Data.formatCreatedAt(data.createdAt),
  });

  const formatShoppingData = (data) => ({
    ...data,
    Value: Data.formatCurrency(data.value),
    CreatedAt: Data.formatCreatedAt(data.createdAt),
  });

  const {
    data: tasksData,
    loading: loadingTasks,
    error: errorTasks,
  } = Data.useFetchData(`${URL}tasks`, formatTaskData);
  const {
    data: shoppingData,
    loading: loadingShopping,
    error: errorShopping,
  } = Data.useFetchData(`${URL}shopping`, formatShoppingData);

  if (loadingTasks || loadingShopping) return <div>Loading...</div>;
  if (errorTasks || errorShopping)
    return <div>Error: {errorTasks?.message || errorShopping?.message}</div>;

  const handleUpdate = async () => {
    // Esta función se puede ajustar para actualizar los datos si es necesario
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
          handleUpdateTasks={"handleUpdateTasks"}
        />
      </div>
    </div>
  );
};

Home.propTypes = {
  tasksData: PropTypes.array,
};
