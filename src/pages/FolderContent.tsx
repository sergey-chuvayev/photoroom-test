import { useParams } from "react-router-dom";
import localForage from "localforage";
import { useEffect, useState } from "react";
import { Image } from "@/types/image";
import { ImageThumbnail } from "@/components/ImageThumbnail/ImageThumbnail";

export const FolderContent = () => {
  const { id } = useParams<{ id: string }>();
  const [images, setImages] = useState<Image[] | null>(null);

  if (!id) {
    return <div>Folder not found</div>;
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imgs = await localForage.getItem<Image[]>(id);
        setImages(imgs);
      } catch (err) {
        console.error("Error fetching image", err);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <div className="w-full h-full flex p-4">
      {images && images.length > 0 ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">{id}</h1>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <ImageThumbnail image={image} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <h1 className="text-2xl font-bold">No images yet in this folder</h1>
        </div>
      )
      }
    </div >
  );
};
