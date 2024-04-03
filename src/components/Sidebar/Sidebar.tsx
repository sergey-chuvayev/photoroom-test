import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 p-3">
        <Button onClick={() => navigate('/create')}>Create</Button>
        <Separator className="my-4" />
      </div>
    </div>
  );
};
