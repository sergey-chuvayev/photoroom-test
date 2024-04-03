import { Button } from "@/components/ui/button";

export const Create = () => {
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Image name</h1>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Start from a Photo
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop your image anywhere on this page
            </p>
            <Button className="mt-4">Select photo</Button>
          </div>
        </div>
      </main>
    </div>
  );
};
