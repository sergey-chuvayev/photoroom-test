import { AddButton } from "@/components/AddButton/AddButton";
import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import loadImage, { LoadImageResult } from "blueimp-load-image";
import { API_KEY, API_URL, BASE64_IMAGE_HEADER, DEFAULT_FOLDER } from "../constants";
import localForage from "localforage";

export const Create = () => {
  const [result, setResult] = useState<string | null>(null);
  const onImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImageToServer(e.target.files[0]);
    } else {
      console.error("No file was picked");
    }
  };

  const uploadImageToServer = (file: File) => {
    loadImage(file, {
      maxWidth: 400,
      maxHeight: 400,
      canvas: true,
    })
      .then(async (imageData: LoadImageResult) => {
        const image = imageData.image as HTMLCanvasElement;
        const imageBase64 = image.toDataURL("image/png");
        const imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, "");
        const data = {
          image_file_b64: imageBase64Data,
        };
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify(data),
        });

        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }

        const result = await response.json();
        const base64Result = BASE64_IMAGE_HEADER + result.result_b64;
        setResult(base64Result);
        saveImage(DEFAULT_FOLDER, base64Result)
      })

      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          {result && (
            <div className="flex items-center justify-center">
              <img
                src={result}
                alt="result from the API"
              />
            </div>
          )}
          {!result && (
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Start from a Photo
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your image anywhere on this page
              </p>
              <AddButton onImageAdd={onImageAdd} className="mt-4" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const saveImage = async (folderId: string, image: string) => {
  try {
    const imageId = uuidv4();
    const existingImages = await localForage.getItem<{ id: string, data: string }[]>(folderId) || [];
    existingImages.push({ id: imageId, data: image });
    await localForage.setItem(folderId, existingImages);
  } catch (err) {
    console.error('Error saving image', err);
  }
};
