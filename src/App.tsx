import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/404";
import Home from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/:title" element={<h1>About</h1>} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
