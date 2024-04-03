import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { DEFAULT_FOLDER } from "@/constants";
import { Separator } from "../ui/separator";
import { Plus } from "lucide-react";
import { CreateFolderModal } from "../CreateFolderModal/CreateFolderModal";
import { useEffect, useState } from "react";
import localforage from "localforage";

export const Folders = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);

  const createFolder = async (name: string) => {
    try {
      const existingFolders = await localforage.keys();
      if (existingFolders.includes(name)) {
        alert("A folder with this name already exists");
      } else {
        await localforage.setItem(name, []);
        setFolders((prevFolders) => [...prevFolders, name]);
      }
    } catch (err) {
      console.error("Error creating folder", err);
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const keys = await localforage.keys();
      setFolders(keys);
    };

    fetchFolders();
  }, []);

  return (
    <>
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onOpenChange={setIsCreateFolderModalOpen}
        onCreateFolder={async (name) => {
          await createFolder(name);
          setIsCreateFolderModalOpen(false)
        }}
      />
      <div className="w-full">
        <NavLink
          to={`/folder/${DEFAULT_FOLDER}`}
          className="w-full justify-start"
        >
          {folders.map((folder) => (
            <NavLink
              key={folder}
              to={`/folder/${folder}`}
              className="w-full justify-start"
            >
              <Button className="w-full justify-start" variant="ghost">
                {folder}
              </Button>
            </NavLink>
          ))}
          <Separator className="my-2" />
          <Button
            className="w-full justify-start"
            variant="ghost"
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            <Plus size={16} className="mr-2" /> Create New Folder
          </Button>
        </NavLink>
      </div>
    </>
  );
};
