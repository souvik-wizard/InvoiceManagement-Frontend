import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/404";
import Dashboard from "./pages/Dashboard";
import FileUpload from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/table" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
