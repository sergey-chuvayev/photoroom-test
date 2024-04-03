import { Image } from "@/types/image";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { MoveImageModal } from "../MoveImageModal/MoveImageModal";
import { useState } from "react";
import localforage from "localforage";

type Props = {
  image: Image;
  onImageMoved: () => void; // TODO: This is a hack 😱, but I did't anticipate the global state when I started this project. I'ts not so much time left so I'm doing this. Please forgive me.
};

export const ImageThumbnail = ({ image, onImageMoved }: Props) => {
  const [isMoveImageModalOpened, setIsMoveImageModalOpened] = useState(false);

  return (
    <>
      <MoveImageModal
        isOpen={isMoveImageModalOpened}
        onOpenChange={setIsMoveImageModalOpened}
        imageId={image.id}
        onMoveImage={async (sourceFolder, destinationFolder, imageId) => {
          moveImage(sourceFolder, destinationFolder, imageId);
          onImageMoved();
        }}
      />
      <Card
        key={image.id}
        className="w-48 h-48 opacity-60 cursor-pointer relative"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="absolute right-1 top-1 z-10 shadow"
              aria-haspopup="true"
              size="icon"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsMoveImageModalOpened(true)}>
              Move to another folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          style={{
            backgroundImage: `url(${image.data})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-full"
        />
      </Card>
    </>
  );
};

const moveImage = async (
  sourceFolder: string,
  destinationFolder: string,
  imageId: string
) => {
  try {
    // Fetch the images from the source folder
    const sourceImages =
      (await localforage.getItem<{ id: string; data: string }[]>(
        sourceFolder
      )) || [];

    // Find the image to move
    const imageIndex = sourceImages.findIndex((image) => image.id === imageId);
    if (imageIndex === -1) {
      console.error("Image not found in source folder");
      return;
    }

    // Remove the image from the source folder
    const [image] = sourceImages.splice(imageIndex, 1);
    await localforage.setItem(sourceFolder, sourceImages);

    // Add the image to the destination folder
    const destinationImages =
      (await localforage.getItem<{ id: string; data: string }[]>(
        destinationFolder
      )) || [];
    destinationImages.push(image);
    await localforage.setItem(destinationFolder, destinationImages);
  } catch (err) {
    console.error("Error moving image", err);
  }
};
