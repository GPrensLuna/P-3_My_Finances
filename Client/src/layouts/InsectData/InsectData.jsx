import * as Components from "../../Components";

export const InsectData = () => {
  return (
    <>
      <div className="text-center text-2xl">
        <h1> Add to table dropdown lists </h1>
      </div>
      <div className="grid grid-cols-5 m-10">
        <div className="col-start-2">
          <Components.InsectConcept />
        </div>
        <div className="col-start-4">
          <Components.InsectType />
        </div>
      </div>
      <div className="text-center text-2xl">
        <h1> Add tasks to remember </h1>
      </div>
      <div>
        <Components.InsectTasks />
      </div>
    </>
  );
};
