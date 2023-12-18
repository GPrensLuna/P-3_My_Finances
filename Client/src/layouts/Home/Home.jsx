import * as Components from "../../Components";

export const Home = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Components.InsectFrom />
        <Components.Dashboard />
      </div>
      <div className="max-h-full overflow-y-auto">
        <Components.Reminder />
      </div>
    </div>
  );
};
