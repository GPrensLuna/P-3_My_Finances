import { Route, Routes } from "react-router-dom";
import * as layouts from "./layouts";
import * as components from "./Components";

function App() {
  return (
    <>
      <components.Navbar />
      <Routes>
        <Route path="/" element={<layouts.Home />}></Route>
        <Route path="/Insect" element={<layouts.InsectData />}></Route>
      </Routes>
    </>
  );
}

export default App;
