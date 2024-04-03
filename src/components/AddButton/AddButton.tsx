import clsx from "clsx";
import { ChangeEvent } from "react";

type Props = {
  onImageAdd: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const AddButton = ({ onImageAdd, className }: Props) => {
  return (
    <label
      className={clsx("cursor-pointer", className)}
      htmlFor="customFileAdd"
    >
      <input
        type="file"
        onChange={onImageAdd}
        className="opacity-0 absolute z-0 w-0 h-0"
        id="customFileAdd"
        accept=".png, .jpg, .jpeg"
      />
      Select photo
    </label>
  );
};
