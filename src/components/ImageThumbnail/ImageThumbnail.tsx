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

type Props = {
  image: Image;
};

export const ImageThumbnail = ({ image }: Props) => {
  return (
    <Card key={image.id} className="w-48 h-48 opacity-60 cursor-pointer relative">
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
          <DropdownMenuItem>Move to another folder</DropdownMenuItem>
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
  );
};
