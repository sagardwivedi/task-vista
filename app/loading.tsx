import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoaderCircleIcon className="animate-spin text-[25rem]" />
    </div>
  );
}
