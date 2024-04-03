import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
