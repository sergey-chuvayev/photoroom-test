import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreateFolder: (name: string) => void;
};

export const CreateFolderModal = ({
  isOpen,
  onOpenChange,
  onCreateFolder,
}: Props) => {
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFolderName("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <Input
          className="w-full"
          placeholder="Folder name"
          autoFocus
          onChange={(e) => setFolderName(e.target.value)}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              if (folderName.trim() !== "") {
                onCreateFolder(folderName);
              } else {
                alert("Folder name cannot be empty");
              }
            }}
          >
            Create folder
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
