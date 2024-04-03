import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { DEFAULT_FOLDER } from "@/constants";

export const Folders = () => {
  return (
    <div className="w-full">
      <NavLink to={`/folder/${DEFAULT_FOLDER.id}`} className="w-full justify-start">
        <Button className="w-full justify-start" variant="ghost">
          {DEFAULT_FOLDER.name}
        </Button>
      </NavLink>
    </div>
  );
};
