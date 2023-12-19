import { CardsTasks } from "../CardsTasks/CardsTasks.jsx";
import PropTypes from "prop-types";

export const Reminder = ({ tasksData, handleUpdateTasks }) => {
  const onUpdateTasks = async () => {
    try {
      await handleUpdateTasks();
    } catch (error) {
      console.error("Error updating tasks:", error);
    }
  };

  return (
    <div className="">
      {tasksData?.map((e) => (
        <CardsTasks
          key={e._id}
          id={e._id}
          name={e.name}
          concept={e.concept}
          type={e.type}
          description={e.description}
          value={e.value}
          done={e.done}
          deleted={e.deleted}
          createdAt={e.CreatedAt}
          onUpdateTasks={onUpdateTasks}
        />
      ))}
    </div>
  );
};

Reminder.propTypes = {
  tasksData: PropTypes.array.isRequired,
  handleUpdateTasks: PropTypes.func.isRequired,
};
