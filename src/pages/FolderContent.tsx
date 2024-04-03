import { useParams } from "react-router-dom";
import localForage from "localforage";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { DEFAULT_FOLDER } from "@/constants";

type Image = {
  id: string;
  data: string;
};

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
      {images ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">{DEFAULT_FOLDER.name}</h1>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img) => (
              <Card
                key={img.id}
                className="w-32 h-48 opacity-60 hover:opacity-100 cursor-pointer"
              >
                <div
                  style={{
                    backgroundImage: `url(${img.data})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full"
                />
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <h1 className="text-2xl font-bold">No images yet in this folder</h1>
        </div>
      )}
    </div>
  );
};
