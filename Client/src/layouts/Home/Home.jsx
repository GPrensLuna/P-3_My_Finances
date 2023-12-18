import * as Components from "../../Components";

export const Home = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Components.InsectFrom />
        <Components.Dashboard />
      </div>
      <div>
        <Components.Reminder />
      </div>
    </div>
  );
};
