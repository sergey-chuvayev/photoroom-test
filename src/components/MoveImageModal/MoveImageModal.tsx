import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import localforage from "localforage";
import { useParams } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onMoveImage: (sourceFolder: string, destinationFolder: string, imageId: string) => void;
  imageId: string;
};

export const MoveImageModal = ({ isOpen, onOpenChange, imageId, onMoveImage }: Props) => {
  const [folders, setFolders] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const currentFolderName = id;

  if (!currentFolderName) {
    throw new Error("Folder ID is missing");
  }

  useEffect(() => {
    const fetchFolders = async () => {
      const keys = await localforage.keys();
      console.log(keys);

      setFolders(keys);
    };

    fetchFolders();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Move image to another folder</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {folders.map((folder) => (
            <Button
              key={folder}
              className="w-full justify-start"
              variant="ghost"
              onClick={() => {
                onMoveImage(currentFolderName, folder, imageId);
                onOpenChange(false);
              }}
            >
              {folder}
            </Button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
