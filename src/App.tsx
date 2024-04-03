import { useEffect } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import localforage from "localforage";
import { DEFAULT_FOLDER } from "./constants";

function App() {
  useEffect(() => {
    const setDefaultFolder = async () => {
      const existingFolders = await localforage.keys();
      if (!existingFolders.includes(DEFAULT_FOLDER)) {
        await localforage.setItem(DEFAULT_FOLDER, []);
      }
    };

    setDefaultFolder();
  }, []);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
