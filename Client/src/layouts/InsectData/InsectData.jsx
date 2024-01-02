import * as Components from "../../Components";

export const InsectData = () => {
  return (
    <div
      className="flex justify-center gap-3 mt-10  "
      style={{ minWidth: "450px" }}
    >
      <div>
        <div className="text-center text-2xl mb-6">
          <h1> Add to table dropdown lists </h1>
        </div>
        <Components.InsectConcept />
        <Components.InsectType />
      </div>
      <div>
        <div className="text-center text-2xl">
          <h1> Add tasks to remember </h1>
        </div>
        <div>
          <Components.InsectTasks />
        </div>
      </div>
    </div>
  );
};
